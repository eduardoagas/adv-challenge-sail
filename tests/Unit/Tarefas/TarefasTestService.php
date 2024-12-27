<?php

namespace Tests\Unit;

use App\Models\Tarefa;
use App\Models\Categoria;
use PHPUnit\Framework\TestCase;

class TarefasTestService extends TestCase
{

    public function test_filtrar_por_categoria()
    {
        $categoria = Categoria::factory()->create();
        $outraCategoria = Categoria::factory()->create();
        $tarefas = Tarefa::factory(5)->create(['categoria_id' => $categoria->id]);
        Tarefa::factory(5)->create(['categoria_id' => $outraCategoria->id]);

        $filtradas = Tarefa::filterByCategory($categoria->id)->get();

        $this->assertCount(5, $filtradas);
        foreach ($filtradas as $tarefa) {
            $this->assertEquals($categoria->id, $tarefa->categoria_id);
        }
    }
}
