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

    public function criar()
    {
        $categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Tarefas/Nova', [
            'categorias' => $categorias,
        ]);
    }

    public function listar()
    {
        $tarefas = $this->tarefaService->listarTarefasDoUsuario(auth()->id);
        return Inertia::render('Tarefas/Lista', [
            'tarefas' => $tarefas,
        ]);
    }

    public function editar()
    {
        return Inertia::render('Tarefas/Editar');
    }

    /*public function buscar(QueryBuscaTarefaRequest $request)
    {
        $filtros = $request->validated();
        $tarefas = $this->tarefaService->buscar($filtros);
    }*/

    public function salvar(TarefaRequest $request)
    {
        $dados = $request->validated();
        try {
            $this->tarefaService->salvar($dados);
            return redirect()->route('tarefas.nova');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao criar tarefa'], 500);
        }
    }

    public function atualizar(TarefaRequest $request, Tarefa $tarefa)
    {
        Gate::authorize('editar', $tarefa);
        $dados = $request->validated();
        $tarefaAtualizada = $this->tarefaService->atualizar($tarefa, $dados);
        return response()->json($tarefaAtualizada, 200);
    }

    public function excluir(TarefaRequest $Request, Tarefa $tarefa)
    {
        Gate::authorize('excluir', $tarefa);
        $this->tarefaService->excluir($tarefa);
        return response()->json(['message' => 'Tarefa excluída com sucesso.'], 200);
    }

    public function concluir(TarefaRequest $Request, Tarefa $tarefa)
    {
        $tarefaConcluida = $this->tarefaService->concluir($tarefa);

        return response()->json([
            'message' => 'Tarefa concluída com sucesso.',
            'tarefa' => $tarefaConcluida
        ], 200);
    }
}
