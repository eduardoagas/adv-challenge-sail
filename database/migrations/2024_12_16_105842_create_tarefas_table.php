<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('criador_user_id'); //criador da tarefa
            $table->string('titulo');
            $table->string('descricao');
            $table->foreignId('categoria_id')->constrained()->onDelete('cascade'); //cada tarefa possui uma categoria
            $table->boolean('concluida')->default(false); // Status de tarefa concluída
            $table->timestamp('data_de_conclusao')->nullable();  // Data de conclusão
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
