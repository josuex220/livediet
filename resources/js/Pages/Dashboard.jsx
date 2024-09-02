import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {
    const { props } = usePage();
    const [pendingDiet, setPendingDiet] = useState([]);

    const successMessage = props.flash.success;

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const response = await axios.get(route('diet.pendigList'));
                setPendingDiet(response.data);
            } catch (error) {
                console.error('Erro ao buscar dietas:', error);
            }
        };

        fetchDiets();
    }, []);

    const form = useForm({
        peso: '',
        altura: '',
        idade: '',
        objetivo: '',
        caloriasDesejadas: '',
        genero: 0,
        selectedCafes: [],
        selectedAlmocos: [],
        selectedLanches: [],
        selectedJantas: [],
        activityLevel: '',
        wantsTraining: '',
        mealTimes: '',
        wantsChocolate: ''
    });

    const toggleSelection = (selectedItems, setSelectedItems, item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else if (selectedItems.length < 10) {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const cafeOptions = [
        'Tapioca + Frango 🌮',
        'Crepioca + Queijo 🧀',
        'Fruta 🍓',
        'Iogurte 🥛',
        'Café ☕',
        'Pão + Ovo 🥖',
        'Pão de queijo 🧀',
        'Café + Leite 🥛',
        'Cuscuz 🍚',
        'Pão + Queijo 🧀',
        'Pão + Presunto 🥓'
    ];

    const almocoOptions = [
        'Frango 🍗',
        'Carne Moída 🥩',
        'Batata-Doce 🍠',
        'Patinho 🥩',
        'Mandioca 🥔',
        'Tilápia 🐟',
        'Alcatra 🥩',
        'Carne-Porco 🐖',
        'Merluza 🐟',
        'Feijão 🍲',
        'Salmão 🐟',
        'Salada 🥗',
        'Inhame 🍠',
        'Arroz 🍚',
        'Macarrão 🍝',
        'Ovo 🥚',
        'Cuscuz 🍚',
        'Batata 🥔'
    ];

    const lancheOptions = [
        'Whey🥛',
        'Fruta🍍',
        'Cuscuz🍚',
        'Pão + Ovo🥖',
        'Tapioca + Frango🥙',
        'Crepioca + Queijo🥞',
        'Leite🥛',
        'Rap10 + Frango🌯',
        'Ovo🥚',
        'Sanduíche Frango 🥪',
        'Sanduíche de Peru🥪'
    ];

    const jantaOptions = [
        'Frango🍗',
        'Patinho🥩',
        'Alcatra🥩',
        'Carne Moida🥩',
        'Mandioca🥔',
        'Carne-Porco🐖',
        'Batata-Doce🍠',
        'Tilápia🐟',
        'Merluza🐟',
        'Suco🥤',
        'Arroz🍚',
        'Feijão🍲',
        'Salada🥗',
        'Macarrão🍝',
        'Ovo🥚',
        'Inhame🍠',
        'Cuscuz🍚',
        'Batata🥔'
    ];

    const handleSubmit = () => {
        form.post(route('diet.submit'), {
            onError: (errors) => {
                // console.log(errors);
            },
            onSuccess: () => {
                form.setData({
                    peso: '',
                    altura: '',
                    idade: '',
                    objetivo: '',
                    caloriasDesejadas: '',
                    genero: 0,
                    selectedCafes: [],
                    selectedAlmocos: [],
                    selectedLanches: [],
                    selectedJantas: [],
                    activityLevel: '',
                    wantsTraining: '',
                    mealTimes: '',
                    wantsChocolate: ''
                })
            }
        });
    };



    const getStatusDiet = (statusDiet, statusPayment) => {
        if(statusPayment == "PENDENTE"){
            return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Dieta Aguardando Pagamento</span>
        }else{
            switch (statusDiet) {
                case 'GERADO':
                    return <>
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Dieta Gerada</span>
                        </>
                    break;

                case 'PENDENTE':
                    return <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Pendente</span>
                break;
            }
        }
    }

    const getStatusPayment = (status) => {
        switch (status) {
            case 'PAGO':
                return <>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Pago</span>
                </>
                break;
            case 'PENDENTE':
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Pendente</span>
                break;
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {pendingDiet.length > 0 && (
                <div className="max-w-7xl mx-auto mt-5 sm:px-6 lg:px-8">
                    <div class="bg-yellow-500 text-white text-lg font-semibold rounded-t-sm p-3">Você possui dietas com pagamento pendente</div>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        {/* Content */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Data
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status de Pagamento
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status da Dieta
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ação
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingDiet.map((item) => (
                                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {new Date(item.created_at).toLocaleDateString('pt-BR')}
                                            </th>
                                            <td className="px-6 py-4">
                                                {getStatusPayment(item.paid)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusDiet(item.pending, item.paid)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.paid=="PENDENTE" && (
                                                    <a href={route('payment.process', {id : item.id})} target={'_BLANK'} className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>Pagar</a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* FIM Content */}
                    </div>
                </div>
            )}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {successMessage && (
                        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {successMessage}
                            </div>
                        </div>
                    )}


                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Olá <b>{auth.user.name}</b>, Seja bem vindo!</div>
                    </div>

                </div>


                {/* Bloco de Medidas */}
                <div className="max-w-7xl  mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Medidas</div>
                        <div className="p-4 rounded-b-lg">
                            <p className="text-sm text-green-500">Informe suas Medidas</p>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    placeholder="Peso"
                                    step={'0.01'}
                                    min={0}
                                    value={form.data.peso}
                                    onChange={e => form.setData('peso', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                />
                                {form.errors.peso && <p className="text-red-500 text-sm">{form.errors.peso}</p>}

                                <input
                                    type="number"
                                    step={'0.01'}
                                    min={0}
                                    placeholder="Altura"
                                    value={form.data.altura}
                                    onChange={e => form.setData('altura', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                />
                                {form.errors.altura && <p className="text-red-500 text-sm">{form.errors.altura}</p>}

                                <input
                                    type="number"
                                    placeholder="Idade"
                                    min={0}
                                    value={form.data.idade}
                                    onChange={e => form.setData('idade', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                />
                                {form.errors.idade && <p className="text-red-500 text-sm">{form.errors.idade}</p>}

                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                    value={form.data.objetivo}
                                    onChange={e => form.setData('objetivo', e.target.value)}
                                >
                                    <option>Selecione seu objetivo</option>
                                    <option value={"Emagrecimento com facilidade"}>Emagrecer</option>
                                    <option value={"Ganho de massa muscular"}>Ganho Massa Muscular</option>
                                    <option value={"Definição e ganho de Massa Muscular"}>Definição + Massa Muscular</option>
                                    <option value={"Definição Muscular"}>Definição</option>
                                    <option value={"Emagrecimento com facilidade + ganho de massa"}>Emagrecer + Massa Muscular</option>
                                </select>
                                {form.errors.objetivo && <p className="text-red-500 text-sm">{form.errors.objetivo}</p>}

                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={form.data.caloriasDesejadas}
                                    onChange={e => form.setData('caloriasDesejadas', e.target.value)}
                                >
                                    <option>Calorias desejadas 🔥</option>
                                    <option value={'Não'}>Não sei dizer</option>
                                    <option value={"1200 a 1500"}>1200 a 1500 calorias</option>
                                    <option value={"1600 a 1900"}>1600 a 1900 calorias</option>
                                    <option value={"2000 a 2300"}>2000 a 2300 calorias</option>
                                    <option value={"2400 a 2700"}>2400 a 2700 calorias</option>
                                    <option value={"2800 a 3100"}>2800 a 3100 calorias</option>
                                    <option value={"3200 a 3500"}>3200 a 3500 calorias</option>
                                </select>
                                {form.errors.caloriasDesejadas && <p className="text-red-500 text-sm">{form.errors.caloriasDesejadas}</p>}
                            </div>

                            <div className="container">
                                <p className="text-sm mt-5 w-full text-center text-green-500">Informe seu Gênero</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => form.setData('genero', 1)}
                                        className={`${form.data.genero === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} rounded-md px-4 py-2 shadow`}
                                    >
                                        Masculino
                                    </button>
                                    <button
                                        onClick={() => form.setData('genero', 2)}
                                        className={`${form.data.genero === 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} rounded-md px-4 py-2 shadow`}
                                    >
                                        Feminino
                                    </button>
                                </div>
                            </div>
                            {form.errors.genero && <p className="text-red-500 text-sm">{form.errors.genero}</p>}

                        </div>
                    </div>
                </div>

                {/* Bloco de Café da Manhã */}
                <div className="max-w-7xl mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Café da manhã ☕ <strong style={{fontSize:12, color:'red'}}>(Até 10 alimentos)</strong></div>
                        <div className="p-4 rounded-b-lg">
                            <div className="grid grid-cols-3 gap-3">
                                {cafeOptions.map((cafe, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSelection(form.data.selectedCafes, (selectedItems) => form.setData('selectedCafes', selectedItems), cafe)}
                                        className={`${form.data.selectedCafes.includes(cafe) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} p-2 rounded-md shadow`}
                                    >
                                        {cafe}
                                    </button>
                                ))}
                            </div>
                            {form.errors.selectedCafes && <p className="text-red-500 text-sm">{form.errors.selectedCafes}</p>}
                        </div>
                    </div>
                </div>

                {/* Bloco de Almoço */}
                <div className="max-w-7xl mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Almoço 🍲 <strong style={{fontSize:12, color:'red'}}>(Até 10 alimentos)</strong></div>
                        <div className="p-4 rounded-b-lg">
                            <div className="grid grid-cols-3 gap-3">
                                {almocoOptions.map((almoco, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSelection(form.data.selectedAlmocos, (selectedItems) => form.setData('selectedAlmocos', selectedItems), almoco)}
                                        className={`${form.data.selectedAlmocos.includes(almoco) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} p-2 rounded-md shadow`}
                                    >
                                        {almoco}
                                    </button>
                                ))}
                            </div>
                            {form.errors.selectedAlmocos && <p className="text-red-500 text-sm">{form.errors.selectedAlmocos}</p>}
                        </div>
                    </div>
                </div>

                {/* Bloco de Lanche */}
                <div className="max-w-7xl mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Lanche 🍞 <strong style={{fontSize:12, color:'red'}}>(Até 10 alimentos)</strong></div>
                        <div className="p-4 rounded-b-lg">
                            <div className="grid grid-cols-3 gap-3">
                                {lancheOptions.map((lanche, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSelection(form.data.selectedLanches, (selectedItems) => form.setData('selectedLanches', selectedItems), lanche)}
                                        className={`${form.data.selectedLanches.includes(lanche) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} p-2 rounded-md shadow`}
                                    >
                                        {lanche}
                                    </button>
                                ))}
                            </div>
                            {form.errors.selectedLanches && <p className="text-red-500 text-sm">{form.errors.selectedLanches}</p>}

                        </div>
                    </div>
                </div>

                {/* Bloco de Janta */}
                <div className="max-w-7xl mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Janta 🍽 <strong style={{fontSize:12, color:'red'}}>(Até 10 alimentos)</strong></div>
                        <div className="p-4 rounded-b-lg">
                            <div className="grid grid-cols-3 gap-3">
                                {jantaOptions.map((janta, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSelection(form.data.selectedJantas, (selectedItems) => form.setData('selectedJantas', selectedItems), janta)}
                                        className={`${form.data.selectedJantas.includes(janta) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} p-2 rounded-md shadow`}
                                    >
                                        {janta}
                                    </button>
                                ))}
                            </div>
                            {form.errors.selectedJantas && <p className="text-red-500 text-sm">{form.errors.selectedJantas}</p>}
                        </div>
                    </div>
                </div>

                {/* Bloco de Configurações */}
                <div className="max-w-7xl mt-5 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-green-500 text-white text-lg font-semibold rounded-t-lg p-3">Informações Adicionais ⚙️</div>
                        <div className="p-4 rounded-b-lg">
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                value={form.data.activityLevel}
                                onChange={e => form.setData('activityLevel', e.target.value)}
                            >
                                <option>Selecione seu nível de atividade</option>
                                <option value={'Sedentário'}>Sedentário</option>
                                <option value={'Leve'}>Leve</option>
                                <option value={'Moderado'}>Moderado</option>
                                <option value={'Intenso'}>Intenso</option>
                            </select>
                            {form.errors.activityLevel && <p className="text-red-500 text-sm">{form.errors.activityLevel}</p>}


                            <select
                                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                value={form.data.wantsTraining}
                                onChange={e => form.setData('wantsTraining', e.target.value)}
                            >
                                <option>Deseja um Treinamento?</option>
                                <option value={'Sim'}>Sim</option>
                                <option value={'Não'}>Não</option>
                            </select>
                            {form.errors.wantsTraining && <p className="text-red-500 text-sm">{form.errors.wantsTraining}</p>}

                            <select
                                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                value={form.data.mealTimes}
                                onChange={e => form.setData('mealTimes', e.target.value)}
                            >
                                <option>Quantas refeições por dia?</option>
                                <option value={'3 Refeições'}>3 Refeições</option>
                                <option value={'4 Refeições'}>4 Refeições</option>
                                <option value={'5 Refeições'}>5 Refeições</option>
                            </select>
                            {form.errors.mealTimes && <p className="text-red-500 text-sm">{form.errors.mealTimes}</p>}

                            <select
                                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                                value={form.data.wantsChocolate}
                                onChange={e => form.setData('wantsChocolate', e.target.value)}
                            >
                                <option>Gosta de Chocolate? 🍫</option>
                                <option value={'Sim'}>Sim</option>
                                <option value={'Não'}>Não</option>
                            </select>
                            {form.errors.wantsChocolate && <p className="text-red-500 text-sm">{form.errors.wantsChocolate}</p>}
                        </div>
                    </div>
                </div>

                {/* Botão de Enviar */}
                <div className="flex justify-center mt-5">
                    <PrimaryButton
                        onClick={handleSubmit}
                        style={{height:55, width:300, justifyContent:'center', alignItems:'center' ,textAlign:'center'}} disabled={form.processing}
                    >
                       Montar minha dieta
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
