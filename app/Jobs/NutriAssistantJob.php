<?php

namespace App\Jobs;

use App\Models\Diet;
use App\Services\GeminiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NutriAssistantJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $diet;
    protected $userId;

    /**
     * Create a new job instance.
     *
     * @param Diet $prompt
     * @param int $userId
     */
    public function __construct(Diet $diet)
    {
        $this->diet = $diet;
    }

    function removeEmojis($text) {
        return preg_replace('/[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{1F700}-\x{1F77F}\x{1F780}-\x{1F7FF}\x{1F800}-\x{1F8FF}\x{1F900}-\x{1F9FF}\x{1FA00}-\x{1FA6F}\x{1FA70}-\x{1FAFF}\x{2600}-\x{26FF}\x{2300}-\x{23FF}\x{2B50}\x{1F004}\x{1F0CF}]/u', '', $text);
    }

    function validaPlanoAlimentar($planoAlimentar) {
        if(count($planoAlimentar) < 7){
            return false;
        }
        return true;
    }

    function validaPlanoTreino($planoTreino) {
        if(count($planoTreino) < 7){
            return false;
        }
        return true;
    }

    function validaOrientacoes($orientacoes) {

        return true;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(GeminiService $geminiService)
    {
        $genero = $this->diet->genero == 1 ? 'Masculino' : 'Feminino';
        $wants_training = $this->diet->wants_training == "Sim" ? 'Desejo Treinar' : 'Não desejo Treinar';
        $wants_chocolate= $this->diet->wants_chocolate== "Não" ? "e não quero que inclua chocolate" : "e quero que inclua chocolate na minha dieta";

        $selected_cafes = implode(",",$this->diet->selected_cafes);
        $selected_almocos = implode(",",$this->diet->selected_almocos);
        $selected_lanches = implode(",",$this->diet->selected_lanches);
        $selected_jantas = implode(",",$this->diet->selected_jantas);


        $prompt = "Meu peso é {$this->diet->peso}KG, tenho {$this->diet->altura} de altura,
          {$this->diet->idade} anos, meu objetivo é {$this->diet->objetivo},
          desejo consumir entre {$this->diet->calorias_desejadas} calorias,
          sou do sexo {$genero},
          meu café da manha deve ter {$selected_cafes},
          Meu almoço deve ter {$selected_almocos},
          meu lanche da tarde e da manha deve ter {$selected_lanches},
          minha janta deve ter {$selected_jantas},
          meu nivel de atividade fisica é {$this->diet->activity_level}, {$wants_training}, quero fazer {$this->diet->meal_times} por dia,
          {$wants_chocolate}";

        $response = $geminiService->generateContent($this->removeEmojis($prompt));


        if (isset($response['status']) && $response['status'] == true && $response['data'] != null) {
            $response['data'] = json_decode($response['data'], true);

            if($this->validaPlanoAlimentar($response['data']['planoAlimentar']) && $this->validaPlanoTreino($response['data']['planoTreino']) && $this->validaOrientacoes($response['data']['orientacoes'])){
                $this->diet->plano_treino       = $response['data']['planoTreino'];
                $this->diet->plano_alimentar    = $response['data']['planoAlimentar'];
                $this->diet->orientacoes        = $response['data']['orientacoes'];
                $this->diet->pending            = "GERADO";
                $this->diet->save();
            }
        } else {
            Log::error('Failed to get response from NutriAssistant');
        }
    }
}
