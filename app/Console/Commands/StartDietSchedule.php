<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Diet;
use App\Jobs\NutriAssistantJob;

class StartDietSchedule extends Command
{
    protected $signature = 'diet:start';
    protected $description = 'Dispatch NutriAssistantJob for all pending and paid diets';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $diets = Diet::where('paid', 'PAGO')
                     ->where('pending', 'PENDENTE')
                     ->get();

        foreach ($diets as $diet) {
            dispatch(new NutriAssistantJob($diet));
        }

        $this->info('Diets dispatched successfully!');
    }
}
