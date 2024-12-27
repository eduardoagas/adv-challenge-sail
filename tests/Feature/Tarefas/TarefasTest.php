<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tarefa;
use App\Models\Categoria;
use Inertia\Testing\AssertableInertia as Assert;

class TarefasTest extends TestCase
{
    public function test_listar_tarefas()
    {
        $user = User::factory()->create();
        $tarefas = Tarefa::factory()->count(3)->create(['criador_user_id' => $user->id]); // Ensure tasks are created for the user
        $response = $this->actingAs($user)->get(route('tarefas.listar'));
        $response->assertStatus(200);


        $response->assertInertia(
            fn(Assert $page) =>
            $page->has('tarefas')
                ->where('tarefas.0.criador_user_id', $user->id)
                ->where('tarefas.1.criador_user_id', $user->id)
                ->where('tarefas.2.criador_user_id', $user->id)
        );
    }

    public function test_atualizar_tarefa()
    {
        $user = User::factory()->create();
        $categoria = Categoria::factory()->create();
        $tarefa = Tarefa::factory()->create(['criador_user_id' => $user->id]);

        $payload = [
            'titulo' => 'Título Atualizado',
            'categoria_id' => $categoria->id,
            'criador_user_id' => $user->id
        ];

        $response = $this->actingAs($user)->put(route('tarefas.atualizar', $tarefa->id), $payload);

        $response->assertRedirect(route('tarefas.listar'));
        $this->assertDatabaseHas('tarefas', ['id' => $tarefa->id, 'titulo' => 'Título Atualizado']);
    }

    public function test_atualizar_tarefa_validation_errors()
    {
        $user = User::factory()->create();
        $categoria = Categoria::factory()->create(); // Assuming a Categoria model exists
        $tarefa = Tarefa::factory()->create(['criador_user_id' => $user->id, 'categoria_id' => $categoria->id]);


        $payload = [
            'titulo' => 'Título Atualizado',
        ];


        $response = $this->actingAs($user)->put(route('tarefas.atualizar', $tarefa->id), $payload);


        $response->assertSessionHasErrors(['categoria_id', 'criador_user_id']);


        $response->assertSessionHasErrors('categoria_id', 'A categoria é obrigatória.');
        $response->assertSessionHasErrors('criador_user_id', 'Usuário criador é obrigatória.');
    }

    public function test_excluir_tarefa()
    {
        $user = User::factory()->create();
        $tarefa = Tarefa::factory()->create(['criador_user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('tarefas.excluir', $tarefa->id));

        $response->assertRedirect(route('tarefas.listar'));
        $this->assertDatabaseMissing('tarefas', ['id' => $tarefa->id]);
    }

    public function test_marcar_tarefa_concluida()
    {
        $user = User::factory()->create();
        $tarefa = Tarefa::factory()->create(['criador_user_id' => $user->id, 'concluida' => false]);

        $response = $this->actingAs($user)->put(route('tarefas.concluir', $tarefa->id));

        $response->assertRedirect(route('tarefas.listar'));
        $this->assertDatabaseHas('tarefas', ['id' => $tarefa->id, 'concluida' => true]);
    }
}
