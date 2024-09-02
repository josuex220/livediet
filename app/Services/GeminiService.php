<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }

    public function generateContent($userInput)
    {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={$this->apiKey}";

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => 'Você é uma especialista em nutrição e fitness, fornecendo orientações personalizadas com base em relatórios completos de saúde e estilo de vida. Ao receber um relatório, você deve:
                                    Analisar o Relatório: Examine os dados sobre saúde geral, hábitos alimentares, nível de atividade física e metas do usuário.
                                    Definir Objetivos: Estabeleça metas realistas baseadas nas informações fornecidas, como perda de peso ou ganho muscular.
                                    Criar Planos Personalizados: Elabore um plano de dieta e exercícios ajustado às necessidades e preferências do usuário, incluindo receitas e rotinas de treino.
                                    Oferecer Diretrizes: Forneça recomendações claras e estratégias para implementar o plano e manter a motivação.
                                    Monitorar e Ajustar: Acompanhe o progresso e faça ajustes conforme necessário, oferecendo suporte contínuo.
                                    Eduque e motive o usuário, explicando como suas escolhas contribuem para alcançar os objetivos de forma saudável e sustentável.
                                    Devolva a sua resposta em formato JSON, as chaves não devem conter espaços e nem caracteres especiais
                                    '],
                    ],
                ],
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => 'Mantenha o seguinte padrão
                                        {
                                            "planoAlimentar": [
                                                {
                                                "refeicao": string -> Periodo,
                                                "dia": string -> dia da semana,
                                                "alimentos": array -> alimentos
                                                }
                                            ],
                                            "planoTreino": [
                                                {
                                                "dia": string -> dia da semana,
                                                "exercicios": array -> exercicios
                                                },
                                            ],
                                            "orientacoes": {
                                                    "hidratacao": string,
                                                    "sono": string,
                                                    "estresse": string,
                                                    "consistencia": string,
                                                    "avaliacao": string
                                                }
                                            }
                                    '],
                    ],
                ],
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => 'é impressindivel que venha todos os nós como indicado e todos preenchidos, faça a programação para somente 7 dias, tente variar as comidas para que atinja o objetivo maximo no decorrer do dia'],
                    ],
                ],
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => 'Faça um plano alimentar para 7 dias e o plano de treino também para 7 dias'],
                    ],
                ],
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => 'É Importante que a medida dos alimentos sejam dados em Gramas (g)'],
                    ],
                ],
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $userInput],
                    ],
                ],
            ],
            'generationConfig' => [
                'temperature' => 1,
                'maxOutputTokens' => 10000,
                'responseMimeType' => 'text/plain',
            ],
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->timeout(240)->post($url, $payload);

        if ($response->successful()) {
            $result = json_decode($response->getBody()->getContents(),true);
            if(!empty($result['candidates'][0]['content']['parts'][0]['text'])){
                $text = str_replace(array("```"),"",str_replace("```json","",$result['candidates'][0]['content']['parts'][0]['text']));


                return array('status' => true, 'data'=> $text);
            }else{
                return array('status' => false, 'data'=> $response->body());
            }
        } else {
            return array('status' => false, 'data'=> $response->body());
        }
    }
}
