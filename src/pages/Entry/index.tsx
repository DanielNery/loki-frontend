import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

interface FormData {
    nm_name: string;
    nm_bank: string;
    nm_value: string;
    nm_description: string;
    nm_date: string;
    nm_type: string;
    is_active: boolean;
}

export default function Entry() {
    const [isNewEntry, setIsNewEntry] = useState(false);
    const [entryId, setEntryId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nm_name: '',
        nm_bank: '',
        nm_value: '',
        nm_description: '',
        nm_date: '',
        nm_type: '',
        is_active: true,
    });

    const { id } = useParams();

    useEffect(() => {
        if (id === 'new') {
            setIsNewEntry(true);
        } else if (id) {
            setIsNewEntry(false);
            setEntryId(id);
    
            const fetchEntry = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/api/v1/entry/${id}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar a entrada.');
                    }
                    const data = await response.json();
                    setFormData(data); // Supondo que a resposta contém os dados da entrada
                } catch (error) {
                    console.error(error);
                }
            };
    
            fetchEntry();
        }
    }, [id]);
    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`{{base_url}}/api/v1/entry/${entryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Erro ao editar a entrada.');
            }
            // Redirecionar ou mostrar mensagem de sucesso
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                {isNewEntry ? (
                    <h1 className="text-3xl mb-4 text-slate-900 dark:text-slate-100">Criar Lancamento</h1>
                ) : (
                    <h1 className="text-3xl mb-4 text-slate-900 dark:text-slate-100">Editar Lancamento</h1>
                )}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_name">
                            Nome
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_name"
                            type="text"
                            name="nm_name"
                            value={formData.nm_name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_bank">
                            Banco
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_bank"
                            type="text"
                            name="nm_bank"
                            value={formData.nm_bank}
                            onChange={handleInputChange}
                            placeholder="Bank"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_value">
                            Valor
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_value"
                            type="number"
                            name="nm_value"
                            value={formData.nm_value}
                            onChange={handleInputChange}
                            placeholder="Value"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_description">
                            Descricao
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_description"
                            name="nm_description"
                            value={formData.nm_description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_date">
                            Data
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_date"
                            type="date"
                            name="nm_date"
                            value={formData.nm_date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="nm_type">
                            Tipo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary-500/50"
                            id="nm_type"
                            type="text"
                            name="nm_type"
                            value={formData.nm_type === 'expense' ? 'Despesa' : 'Receita'}
                            onChange={handleInputChange}
                            placeholder="Type"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2" htmlFor="is_active">
                            Ativo
                        </label>
                        <input
                            className="mr-2 leading-tight"
                            id="is_active"
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
