<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tarefa extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'descricao', 'concluida', 'data_de_conclusao', 'criador_user_id', 'categoria_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'tarefa_users', 'tarefa_id', 'user_id');
    }

    public function categorias()
    {
        return $this->belongsTo(Categoria::class);
    }

}
