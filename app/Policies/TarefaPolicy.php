<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Tarefa;

class TarefaPolicy
{
    public function editar(User $user, Tarefa $tarefa): bool
    {
        return $user->id === $tarefa->criador_user_id;
    }

    public function excluir(User $user, Tarefa $tarefa): bool
    {
        return $user->id === $tarefa->criador_user_id;
    }
}
