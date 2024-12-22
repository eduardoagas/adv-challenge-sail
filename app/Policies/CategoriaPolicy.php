<?php

namespace App\Policies;

use App\Models\Categoria;
use App\Models\User;

class CategoriaPolicy
{
    public function editar(User $user, Categoria $categoria): bool
    {
        return $user->id === $categoria->criador_user_id;
    }

    public function excluir(User $user, Categoria $categoria): bool
    {
        return $user->id === $categoria->criador_user_id;
    }
}
