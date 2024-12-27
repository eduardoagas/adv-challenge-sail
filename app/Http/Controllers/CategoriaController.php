<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Categoria;
use Illuminate\Http\Request;
use App\Services\CategoriaService;
use App\Http\Requests\CategoriaRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\QueryBuscaRequest;

class CategoriaController extends Controller
{
    protected $categoriaService;

    public function __construct(CategoriaService $categoriaService)
    {
        $this->categoriaService = $categoriaService;
    }

   /* public function criar()
    {
        //$categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Categorias/Nova', [
            //'categorias' => $categorias,
        ]);
    }*/

    public function listar()
    {
        $categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Categorias/Categorias', [
            'categorias' => $categorias,
        ]);
    }

    public function salvar(CategoriaRequest $request)
    {
        $dados = $request->validated();
        

        try {
            $this->categoriaService->salvar($dados);
            return redirect()->route('categorias.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao criar tarefa'], 500);
        }
    }

    public function atualizar(CategoriaRequest $request, Categoria $categoria)
    {
        Gate::authorize('editar', $categoria);
        $dados = $request->validated();

        try {
            $categoriaAtualizada = $this->categoriaService->atualizar($categoria, $dados);
            return redirect()->route('categorias.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao editar tarefa'], 500);
        }
    }

    public function excluir(Request $Request, Categoria $categoria)
    {
        Gate::authorize('excluir', $categoria);

        try {
            $this->categoriaService->excluir($categoria);
            return redirect()->route('categorias.listar');
        } catch (\Exception $e) {
            logger()->error($e->getMessage());
            return response()->json(['error' => 'Erro ao excluir tarefa'], 500);
        }
    }

}
