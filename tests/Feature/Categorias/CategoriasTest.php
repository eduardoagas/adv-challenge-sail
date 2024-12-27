<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Categoria;
use Inertia\Testing\AssertableInertia as Assert;

class CategoriasTest extends TestCase
{
    public function test_listar_categorias()
    {
        $user = User::factory()->create();
        $categorias = Categoria::factory()->count(3)->create(['criador_user_id' => $user->id]); // Ensure tasks are created for the user
        $response = $this->actingAs($user)->get(route('categorias.listar'));
        $response->assertStatus(200);


        $response->assertInertia(
            fn(Assert $page) =>
            $page->has('categorias')
        );
    }

    public function test_atualizar_categoria()
    {
        $user = User::factory()->create();
        $categoria = Categoria::factory()->create(['criador_user_id' => $user->id]);

        $payload = [
            'nome' => 'Nome Atualizado',
            'criador_user_id' => $user->id     // Add criador_user_id
        ];

        $response = $this->actingAs($user)->put(route('categorias.atualizar', $categoria->id), $payload);

        $response->assertRedirect(route('categorias.listar'));
        $this->assertDatabaseHas('categorias', ['id' => $categoria->id, 'nome' => 'Nome Atualizado']);
    }


    public function test_excluir_categoria()
    {
        $user = User::factory()->create();
        $categoria = Categoria::factory()->create(['criador_user_id' => $user->id]);

        $response = $this->actingAs($user)->delete(route('categorias.excluir', $categoria->id));

        $response->assertRedirect(route('categorias.listar'));
        $this->assertDatabaseMissing('categorias', ['id' => $categoria->id]);
    }
}
