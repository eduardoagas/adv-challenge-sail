<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TarefaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoriaController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('tarefas.listar'); // Redirect logged-in users to the tarefas.listar route
    }

    return redirect()->route('login'); // Redirect guests to the login page
});


Route::middleware('auth')->group(function () {
    Route::prefix('tarefas')->group(function () {
        //Route::get("nova_tarefa", [TarefaController::class, "criar"])->name('tarefas.nova');
        Route::get("listar_tarefas", [TarefaController::class, "listar"])->name('tarefas.listar');
        Route::put("editar_tarefa/{tarefa}", [TarefaController::class, "atualizar"])->name('tarefas.atualizar');
        Route::put("concluir_tarefa/{tarefa}", [TarefaController::class, "concluir"])->name('tarefas.concluir');
        Route::post("salvar_tarefa", [TarefaController::class, 'salvar'])->name('tarefas.salvar');
        Route::delete("excluir_tarefa/{tarefa}", [TarefaController::class, 'excluir'])->name('tarefas.excluir');
    });
    Route::prefix('categorias')->group(function () {
        Route::get("nova_categoria", [CategoriaController::class, "criar"]);
        Route::get("listar_categorias", [CategoriaController::class, "listar"])->name('categorias.listar');
        Route::get("editar_categorias", [CategoriaController::class, "editar"]);
        Route::post("salvar_categoria", [CategoriaController::class, 'salvar'])->name('categorias.salvar');
    });
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
