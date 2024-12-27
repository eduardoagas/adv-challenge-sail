<?php

namespace App\Services;

use App\Models\Tarefa;
use App\Repositories\TarefaRepository;


class TarefaService
{
    protected $tarefaRepository;

    public function __construct(TarefaRepository $tarefaRepository)
    {
        $this->tarefaRepository = $tarefaRepository; //obrigatorio
    }

    public function salvar(array $data)
    {
        return $this->tarefaRepository->saveTarefa($data);
    }

    public function listarTarefasDoUsuario(int $userId): array
    {
        return $this->tarefaRepository->getTarefasPorUsuario($userId);
    }

    public function atualizar(Tarefa $tarefa, array $dados)
    {
        return $this->tarefaRepository->updateTarefa($tarefa, $dados);
    }

    public function excluir(Tarefa $tarefa)
    {
        $this->tarefaRepository->deleteTarefa($tarefa);
    }

    public function concluir(Tarefa $tarefa)
    {
        return $this->tarefaRepository->atualizarStatus($tarefa);
    }
}
