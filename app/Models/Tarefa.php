<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    protected $fillable = ['titulo', 'descricao', 'concluida', 'data_de_conclusao', 'criador_user_id', 'categoria_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function categorias()
    {
        return $this->belongsTo(Categoria::class);
    }

}
