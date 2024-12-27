<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Tarefa;
use Illuminate\Http\Request;
use App\Services\TarefaService;
use App\Http\Requests\TarefaRequest;
use Illuminate\Support\Facades\Gate;
//use App\Http\Requests\QueryBuscaTarefaRequest;
use App\Services\CategoriaService;

class TarefaController extends Controller
{
    protected $tarefaService;
    protected $categoriaService;

    public function __construct(TarefaService $tarefaService, CategoriaService $categoriaService)
    {
        $this->tarefaService = $tarefaService;
        $this->categoriaService = $categoriaService;
    }

    public function listar()
    {
        $tarefas = $this->tarefaService->listarTarefasDoUsuario(auth()->id());
        $categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Tarefas/Tarefas', [
            'tarefas' => $tarefas,
            'categorias' => $categorias,
        ]);
    }

    public function salvar(TarefaRequest $request)
    {
        $dados = $request->validated();
        try {
            $this->tarefaService->salvar($dados);
            return redirect()->route('tarefas.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao criar tarefa'], 500);
        }
    }

    public function atualizar(TarefaRequest $request, Tarefa $tarefa)
    {
        Gate::authorize('editar', $tarefa);
        $dados = $request->validated();
        try {
            $tarefaAtualizada = $this->tarefaService->atualizar($tarefa, $dados);
            return redirect()->route('tarefas.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao editar tarefa'], 500);
        }
    }

    public function excluir(Tarefa $tarefa)
    {
        Gate::authorize('excluir', $tarefa);
        try {
            $this->tarefaService->excluir($tarefa);
            return redirect()->route('tarefas.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao excluir tarefa'], 500);
        }
    }

    public function concluir(Tarefa $tarefa)
    {
        try {
            $this->tarefaService->concluir($tarefa);
            return redirect()->route('tarefas.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json([
                'message' => 'Tarefa concluída com sucesso.',
            ], 200);
        }
    }
}
