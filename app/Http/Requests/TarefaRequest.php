<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'categoria_id' => 'required|integer|exists:categorias,id',
            'categoria_id' => 'required|integer',
            'concluida' => 'nullable|boolean',
            'criador_user_id' => 'required|integer|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'titulo.required' => 'O título é obrigatório.',
            'categoria_id.required' => 'A categoria é obrigatória.',
            'categoria_id.exists' => 'A categoria informada não existe.',
            'criador_user_id.required' => 'Usuário criador é obrigatória.',
            'criador_user_id.exists' => 'O usuário não existe.',
            'concluida.boolean' => 'O campo "concluída" deve ser verdadeiro ou falso.',
        ];
    }
}
