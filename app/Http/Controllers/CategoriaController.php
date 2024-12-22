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

    public function criar()
    {
        //$categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Categorias/Nova', [
            //'categorias' => $categorias,
        ]);
    }

    public function listar()
    {
        $categorias = $this->categoriaService->getAllCategorias();
        return Inertia::render('Categorias/Lista', [
            'categorias' => $categorias,
        ]);
    }

    public function editar()
    {
        return Inertia::render('Categorias/Editar');
    }

    public function salvar(CategoriaRequest $request)
    {
        $dados = $request->validated();
        $categoria = $this->categoriaService->salvar($dados);
        return response()->json($categoria, 201);
    }

    public function atualizar(Request $request, Categoria $categoria)
    {
        Gate::authorize('editar', $categoria);
        $dados = $request->validated();
        $categoriaAtualizada = $this->categoriaService->atualizar($categoria, $dados);
        return response()->json($categoriaAtualizada, 200);
    }

    public function excluir(Request $Request, Categoria $categoria)
    {
        Gate::authorize('excluir', $categoria);
        $this->categoriaService->excluir($categoria);
        return response()->json(['message' => 'Categoria excluída com sucesso.'], 200);
    }

}
