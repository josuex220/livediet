<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use App\Models\MercadoPago;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\MercadoPagoService;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    protected $mercadoPagoService;

    public function __construct(MercadoPagoService $mercadoPagoService)
    {
        $this->mercadoPagoService = $mercadoPagoService;
    }

    public function getTransactions(Request $request)
    {
        set_time_limit(600);
        if(empty($_GET['sToken'])){
            if(($_GET['sToken'] ?? '') !== "48heN4EM6V2U6rmpGvyRdgBMFJBy"){
                return response('Acesso não permitido',405);
            }
        }

        $pendingPayments = MercadoPago::where('status', 'PENDING')->get();
        $token =  env('MERCADOPAGO_ACCESS_TOKEN');


        foreach ($pendingPayments as $payment) {
            try {
                $client = new Client();
                $response = $client->get("https://api.mercadopago.com/v1/payments/search?external_reference={$payment->mp_id}", [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $token,
                    ],
                ]);

                if ($response->getStatusCode() == 200) {
                    $responseData = json_decode($response->getBody(), true)['results'][0];
                    if ($responseData['status'] === 'approved') {
                        $payment->status = 'PAGO';
                            $diet = Diet::where('id', $payment->diet_id);
                            $diet->paid =   "PAGO";
                            $diet->save();
                        $payment->save();
                    } elseif ($responseData['status'] === 'rejected' || $responseData['status'] === 'cancelled') {
                        $payment->status = 'CANCELED';
                        $payment->save();
                    }
                } else {
                    return response()->json(['message' => 'Erro ao verificar o status do pagamento.'], 500);
                }
            } catch (\Exception $e) {
                // return response()->json(['message' => 'Erro ao gerar o pagamento: ' . $e->getMessage()], 500);
            }
        }


        return response()->json(['success' => true]);
    }

    public function createPayment($id)
    {

        if (!$id) {
            return redirect('/pagamento/falha');
        }

        $user = Auth::user();

        $diet = Diet::where('id',$id)->where('user_id', $user->id)->first();

        if (!$diet) {
            return redirect('/pagamento/falha');
        }

        $items = [
            [
                'title' => 'Live Diet - Dieta Semanal',
                'quantity' => 1,
                'currency_id' => 'BRL',
                'unit_price' => (float) 10.99
            ]
        ];

        $payer = [
            'email' => $user->email,
            'name' => $user->name
        ];

        $backUrls = [
            'success' => url('/pagamento/sucesso'),
            'failure' => url('/pagamento/falha'),
            'pending' => url('/pagamento/pendente')
        ];
        $external_reference = uniqid();

        $result = $this->mercadoPagoService->createPreference($items, $payer, $backUrls, $external_reference);

        if ($result['status'] == 'success') {
            MercadoPago::create([
                'user_id' => $user->id,
                'price'   => 10.99,
                'status'  => 'PENDING',
                'diet_id' => $id,
                'mp_id'   => $result['preference']['external_reference']
            ]);

            return redirect($result['preference']['init_point']);
        } else {
            return response()->json(['message' => 'Erro ao criar preferência de pagamento', 'error' => $result['error']], 400);
        }
    }
}
