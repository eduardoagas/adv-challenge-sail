<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Tarefa;
use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tarefa>
 */
class TarefaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Tarefa::class;

    public function definition(): array
    {
        return [
            'criador_user_id' => User::factory(),
            'titulo' => $this->faker->sentence,
            'descricao' => $this->faker->paragraph,
            'categoria_id' => Categoria::factory(),
            'concluida' => $this->faker->boolean,
            'data_de_conclusao' => $this->faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
