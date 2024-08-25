<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DietController extends Controller
{
    public function index(Request $request){
        return Inertia::render('Diet/List');
    }

    public function view(Request $request, $id){

        return Inertia::render('Diet/View', [
            "id" => $id
        ]);
    }

    public function details($id) {
        $diet = Diet::where('user_id', Auth::id())->where('id', $id)->first();

        if (!$diet) {
            return response()->json([
                'success' => false,
                'error'   => "Dieta não foi encontrada"
            ], 404);
        }

        $diet = [
            'plano_treino'    => json_decode($diet['plano_treino'], true),
            'orientacoes'     => json_decode($diet['orientacoes'], true),
            'plano_alimentar' => json_decode($diet['plano_alimentar'], true),
            'pending'         => $diet['pending'],
            'paid'            => $diet['paid'],
            'user_id'         => $diet['user_id']
        ];


        return response()->json([
            'success' => true,
            'data' => $diet
        ]);
    }


    public function list(){
        $diets = Diet::where('user_id', Auth::id())->get()
            ->map(function ($item) {
                return [
                    'created_at' => $item['created_at'],
                    'paid' => $item['paid'],
                    'pending' => $item['pending'],
                    'id' => $item['id'],
                ];
            });

        return response()->json($diets);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'peso' => 'required|numeric',
            'altura' => 'required|numeric',
            'idade' => 'required|integer',
            'objetivo' => 'required|string',
            'caloriasDesejadas' => 'required|string',
            'genero' => 'required|in:1,2',
            'selectedCafes' => 'required|array',
            'selectedCafes.*' => 'string',
            'selectedAlmocos' => 'required|array',
            'selectedAlmocos.*' => 'string',
            'selectedLanches' => 'required|array',
            'selectedLanches.*' => 'string',
            'selectedJantas' => 'required|array',
            'selectedJantas.*' => 'string',
            'activityLevel' => 'required|string',
            'wantsTraining' => 'required|string',
            'mealTimes' => 'required|string',
            'wantsChocolate' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }


        $dtRequest = array(
            'peso'                  => $request->all()['peso'],
            'altura'                => $request->all()['altura'],
            'idade'                 => $request->all()['idade'],
            'objetivo'              => $request->all()['objetivo'],
            'genero'                => $request->all()['genero'],
            'calorias_desejadas'    => $request->all()['caloriasDesejadas'],
            'selected_cafes'        => $request->all()['selectedCafes'],
            'selected_almocos'      => $request->all()['selectedAlmocos'],
            'selected_lanches'      => $request->all()['selectedLanches'],
            'selected_jantas'       => $request->all()['selectedJantas'],
            'activity_level'        => $request->all()['activityLevel'],
            'wants_training'        => $request->all()['wantsTraining'],
            'meal_times'            => $request->all()['mealTimes'],
            'wants_chocolate'       => $request->all()['wantsChocolate'],
            'user_id'               => Auth::id(),
            'paid'                  => 'PENDENTE',
            'pending'               => 'PENDENTE'
        );


        $diet = Diet::create($dtRequest);

        return redirect()->route('dashboard')->with('success', 'Dieta criada com sucesso!');
    }
}
