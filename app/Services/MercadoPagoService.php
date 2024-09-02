<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MercadoPagoService
{
    private $accessToken;

    public function __construct()
    {
        $this->accessToken = env('MERCADOPAGO_ACCESS_TOKEN');
    }

    public function createPreference($items, $payer, $backUrls, $external_id)
    {
        $url = 'https://api.mercadopago.com/checkout/preferences';

        $preferenceData = [
            'description' => 'Live Diet',
            'title' => 'Live Diet',
            'statement_descriptor'=> 'LiveDiet',
            'expires' => true,
            'expiration_date_to' => Carbon::now()->addDays(1)->format('Y-m-d\TH:i:s.vP'),
            'items' => $items,
            'payer' => $payer,
            'back_urls' => $backUrls,
            'auto_return' => 'approved',
            'external_reference' => $external_id,
        ];

        try {
            $response = Http::withToken($this->accessToken)
                ->post($url, $preferenceData);

            if ($response->successful()) {
                return ['status' => 'success', 'preference' => $response->json()];
            } else {
                return ['status' => 'failure', 'error' => $response->json()];
            }
        } catch (\Exception $e) {
            Log::error('Erro ao criar preferência de pagamento no MercadoPago: ' . $e->getMessage());
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}
