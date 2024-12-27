<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Categoria::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->word,
            'criador_user_id' => User::factory(),  
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
