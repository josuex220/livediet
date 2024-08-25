<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diet extends Model
{
    protected $fillable = [
        'peso',
        'altura',
        'idade',
        'objetivo',
        'calorias_desejadas',
        'genero',
        'selected_cafes',
        'selected_almocos',
        'selected_lanches',
        'selected_jantas',
        'activity_level',
        'wants_training',
        'meal_times',
        'wants_chocolate',
        'user_id',
        'pending',
        'paid',
        'orientacoes',
        'plano_alimentar',
        'plano_treino'
    ];

    protected $casts = [
        'selected_cafes' => 'array',
        'selected_almocos' => 'array',
        'selected_lanches' => 'array',
        'selected_jantas' => 'array',
    ];
}
