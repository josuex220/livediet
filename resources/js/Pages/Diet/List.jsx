import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios'; // Import axios corretamente
import { useEffect, useState } from 'react';

export default function List({ auth }) {
    const [diet, setDiet] = useState([]);

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const response = await axios.get(route('diet.list'));
                setDiet(response.data);
            } catch (error) {
                console.error('Erro ao buscar dietas:', error);
            }
        };

        fetchDiets();
    }, []);

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lista de Dietas</h2>}
        >
            <Head title="Lista de Dietas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Olá <b>{auth.user.name}</b>, Seja bem vindo!</div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-5 sm:px-6 lg:px-8">
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
                                    {diet.map((item) => (
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
                                                {(item.paid=="PAGO" && item.pending=="GERADO") && (
                                                    <Link className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' href={route('diet.view', {id:item.id})}>Acessar Minha Dieta</Link>
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
            </div>
        </AuthenticatedLayout>
    );
}
