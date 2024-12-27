<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\Tarefa;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class DeletarTarefasConcluidas implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $dateOneWeekAgo = Carbon::now()->subWeek();

        Tarefa::where('concluida', true)
            ->where('data_de_conclusao', '<', $dateOneWeekAgo)
            ->delete();
    }
}
