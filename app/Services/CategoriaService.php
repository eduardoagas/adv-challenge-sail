<?php

namespace App\Services;

use App\Models\Categoria;
use App\Repositories\CategoriaRepository;

class CategoriaService
{
    protected $categoriaRepository;

    public function __construct(CategoriaRepository $categoriaRepository)
    {
        $this->categoriaRepository = $categoriaRepository;
    }

    public function getAllCategorias(): array
    {
        $categorias = $this->categoriaRepository->getAllCategorias();

        return $categorias->toArray();
    }

    public function salvar(array $data)
    {
        return $this->categoriaRepository->saveCategoria($data);
    }

    public function atualizar(Categoria $tarefa, array $dados)
    {
        return $this->categoriaRepository->updateCategoria($tarefa, $dados);
    }

    public function excluir(Categoria $tarefa)
    {
        $this->categoriaRepository->deleteCategoria($tarefa);
    }

}
