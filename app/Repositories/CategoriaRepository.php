<?php

namespace App\Repositories;

use App\Models\Categoria;


class CategoriaRepository
{
    public function getAllCategorias()
    {
        return Categoria::all();
    }

    public function saveCategoria(array $dados)
    {
        $categoria = Categoria::create($dados);
        return $categoria;
    }

    public function updateCategoria(Categoria $categoria, array $dados)
    {
        $categoria->update($dados);
        return $categoria;
    }

    public function deleteCategoria(Categoria $categoria)
    {
        $categoria->delete();
    }
}
