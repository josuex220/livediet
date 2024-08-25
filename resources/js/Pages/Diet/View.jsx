import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function List({ auth }) {
    const { props } = usePage();
    const [pending, setPending] = useState(true);
    const [diet, setDiet] = useState({});

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const response = await axios.get(route('diet.detail', { id: props.id })).finally(() => {
                    setPending(false);
                });
                setDiet(response.data);
            } catch (error) {
                console.error('Erro ao buscar dietas:', error);
            }
        };

        fetchDiets();
    }, []);

    if (diet.success !== true && pending === false) {
        return (
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plano de Treino</h2>}>
                <Head title="Plano de Treino" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Olá <b>{auth.user.name}</b>, Seja bem-vindo!</div>
                        </div>
                        <div className="flex mt-4 items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Plano de treino não encontrado!</span> Infelizmente o plano de treino não foi encontrado, tente voltar mais tarde.
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (pending === true) {
        return (
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plano de Treino</h2>}>
                <Head title="Plano de Treino" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Olá <b>{auth.user.name}</b>, Seja bem-vindo!</div>
                        </div>
                        <div className="flex mt-4 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Aguarde...</span>
                            <div>
                                <span className="font-medium">Buscando Informações</span> Aguarde enquanto buscamos algumas informações do seu plano de treino.
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (diet.data.paid === "PENDENTE") {
        return (
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plano de Treino</h2>}>
                <Head title="Plano de Treino" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">Olá <b>{auth.user.name}</b>, Seja bem-vindo!</div>
                        </div>
                        <div className="flex mt-4 items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Aguardando Pagamento.</span>
                            <div>
                                <span className="font-bold">Aguardando pagamento</span> Seu plano de treino ainda não foi liberado, caso já tenha efetuado o pagamento, aguarde alguns minutos para que possamos confirmar.
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plano de Treino</h2>}>
            <Head title="Plano de Treino" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h4 className="text-xl font-semibold mb-5" style={{
                            float: 'left',
                            backgroundColor: 'rgba(0,0,0,.1)',
                            paddingVertical: 15,
                            fontSize: 14,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            Plano de Alimentação
                        </h4>

                        {diet.data.plano_alimentar && diet.data.plano_alimentar.length > 0 ? (
                            diet.data.plano_alimentar.reduce((acc, refeicao) => {
                                const dia = acc.find(d => d.dia === refeicao.dia);
                                if (dia) {
                                    dia.refeicoes.push(refeicao);
                                } else {
                                    acc.push({
                                        dia: refeicao.dia,
                                        refeicoes: [refeicao]
                                    });
                                }
                                return acc;
                            }, []).map((diaObj, index) => (
                                <div key={index} className="mb-6">

                                    <div style={{float: 'left', width:'100%'}}><h4 className="text-xl mt-5 font-semibold mb-4"  style={{
                                        float: 'left',
                                        backgroundColor: 'rgba(0,0,0,.03)',
                                        paddingVertical: 15,
                                        fontSize: 14,
                                        color:'rgb(130,130,130)',
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                        width: '50%'
                                    }}>{diaObj.dia}</h4>
                                    </div>
                                    {diaObj.refeicoes.map((refeicao, idx) => (
                                        <div key={idx} className="mb-4">
                                            <h5 className="text-lg font-semibold mb-2" >{refeicao.refeicao}</h5>
                                            <ul className="list-disc list-inside ml-4">
                                                {refeicao.alimentos.map((alimento, alimentoIdx) => (
                                                    <li key={alimentoIdx}>{alimento}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>Nenhum plano alimentar disponível.</p>
                        )}


                            <h4 className="text-xl font-semibold mb-5" style={{float:'left',backgroundColor:'rgba(0,0,0,.1)',paddingVertical:15, fontSize:14, textTransform:'uppercase', textAlign:'center', width:'100%'}}>Plano de Treino</h4>

                            {diet.data.plano_treino && diet.data.plano_treino.length > 0 ? (
                                diet.data.plano_treino.map((dia, index) => (
                                    <div key={index} className="mb-6">
                                        <h4 className="text-xl font-semibold mb-2">{dia.dia}</h4>
                                        <ul className="list-disc list-inside ml-4">
                                            {dia.exercicios.map((exercicio, idx) => (
                                                <li key={idx}>{exercicio}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum plano de treino disponível.</p>
                            )}

                            {diet.data.orientacoes && (
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold mb-5" style={{float:'left',backgroundColor:'rgba(0,0,0,.1)',paddingVertical:15, fontSize:14, textTransform:'uppercase', textAlign:'center', width:'100%'}}>Orientações</h4>
                                    <ul style={{listStyle:'inside'}}>
                                        {Object.values(diet.data.orientacoes).map((dt, index) => (
                                            <li key={index} className='mt-2'>{dt}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-8">
                                <Link href={route('diet.index')}>
                                    <PrimaryButton className="bg-blue-500 hover:bg-blue-700">Voltar a minha lista</PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
