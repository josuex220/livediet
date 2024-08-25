<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdmin extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name'      => 'Josue Vidal',
            'email'     => 'josue@livediet.com.br',
            'level'     => 'ADMIN',
            'password'  => Hash::make('123789456')
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Joas Vidal',
            'email' => 'joas@livediet.com.br',
            'level' => 'ADMIN',
            'password'  => Hash::make('123789456')
        ]);
    }
}
