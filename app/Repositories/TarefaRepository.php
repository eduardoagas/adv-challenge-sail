<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Tarefa;


class TarefaRepository
{

    public function getTarefasPorUsuario(int $userId): array
    {
        return User::findOrFail($userId)->tarefas()->get()->toArray();
    }

    /*public function getTarefas(array $filtros = [])
    {
        $query = Tarefa::query();

        // por Categoria
        if (!empty($filters['categoria_id'])) {
            $query->where('categoria_id', $filtros['categoria_id']);
        }

        // por título 
        if (!empty($filters['titulo'])) {
            $query->where('titulo', 'like', '%' . $filtros['titulo'] . '%');
        }
        
        // se Concluídas - desnecessário?
        if (isset($filters['concluida'])) {
            $query->where('concluida', filter_var($filters['completed'], FILTER_VALIDATE_BOOLEAN));
        }

        // Ordenação
        if (!empty($filters['order_by'])) {
            $query->orderBy($filtros['order_by'], $filters['direcao'] ?? 'asc');
        }

        return $query->get();
    }*/

    public function saveTarefa(array $dados)
    {
        $tarefa = Tarefa::create($dados);
        $tarefa->users()->attach(auth()->id());
        return $tarefa;
    }

    public function updateTarefa(Tarefa $tarefa, array $dados)
    {
        $tarefa->update($dados);
        return $tarefa;
    }

    public function deleteTarefa(Tarefa $tarefa)
    {
        $tarefa->delete();
    }

    public function atualizarStatus(Tarefa $tarefa)
    {
        $tarefa->concluida = true;
        $tarefa->save();
        return $tarefa;
    }
}
