<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MercadoPago extends Model
{
    use HasFactory;

    protected $table = 'mercadopago';

    protected $fillable = [
        'user_id',
        'price',
        'status',
        'mp_id',
        'diet_id'
    ];

}
