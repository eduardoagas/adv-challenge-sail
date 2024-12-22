<?php

namespace App\Repositories;

use App\Models\Categoria;


class CategoriaRepository
{
    public function getAllCategorias()
    {
        return Categoria::all();
    }

    public function savecategoria(array $dados)
    {
        $categoria = Categoria::create($dados);
        return $categoria;
    }

    public function updateTarefa(Categoria $categoria, array $dados)
    {
        $categoria->update($dados);
        return $categoria;
    }

    public function deleteTarefa(Categoria $categoria)
    {
        $categoria->delete();
    }
}
