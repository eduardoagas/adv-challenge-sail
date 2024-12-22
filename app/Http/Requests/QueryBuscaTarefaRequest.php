<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QueryBuscaTarefaRequest extends FormRequest
{
    public function authorize()
    {
        // Permitir ou restringir a execução desta requisição
        return true; // Permitir para todos os usuários
    }

    public function rules()
    {
        return [
            'titulo' => 'nullable|string|max:255',
            'categoria_id' => 'nullable|integer|exists:categorias,id',
            'concluida' => 'nullable|boolean',
            'order_by' => 'nullable|string|in:created_at,titulo',
            'direcao' => 'nullable|string|in:asc,desc',
        ];
    }

    public function messages()
    {
        return [
            'categoria_id.integer' => 'A categoria deve ser um número inteiro.',
            'titulo.max' => 'O título não pode exceder 255 caracteres.',
            'categoria_id.exists' => 'A categoria selecionada não existe.',
            'concluida.boolean' => 'O campo concluída deve ser verdadeiro ou falso.',
            'order_by.in' => 'O campo de ordenação deve ser "created_at" ou "titulo".',
            'direcao.in' => 'A direção deve ser "asc" ou "desc".',
        ];
    }
}
