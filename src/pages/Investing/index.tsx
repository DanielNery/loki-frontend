import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { api } from '../../services/api';

interface InvestmentRecord {
  _id: string;
  dt_negocio: string;
  tp_movimentacao: string;
  nm_produto: string;
  nm_instituicao: string;
  nr_quantidade: number;
  nr_preco: number;
  nr_valor: number;
}

export default function Investing() {
  const [records, setRecords] = useState<InvestmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/v1/investing');
      setRecords(res.data);
    } catch (err: any) {
      setError('Erro ao buscar registros de investimentos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Investimentos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Acompanhe seus registros de investimentos
          </p>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden animate-slide-up">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Registros de Investimentos</h2>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="text-slate-600 dark:text-slate-400">Carregando...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center py-12">
                <div className="text-accent-600 dark:text-accent-400">{error}</div>
              </div>
            ) : records.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="text-slate-500 dark:text-slate-400">Nenhum registro encontrado.</div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Instituição
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {records.map((rec) => (
                    <tr key={rec._id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                        {rec.dt_negocio?.slice(0, 10)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          rec.tp_movimentacao === 'Compra' 
                            ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400'
                            : 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400'
                        }`}>
                          {rec.tp_movimentacao}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                        {rec.nm_produto}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {rec.nm_instituicao}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                        {rec.nr_quantidade}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                        {rec.nr_preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-bold ${
                          rec.nr_valor < 0 
                            ? 'text-accent-600 dark:text-accent-400' 
                            : 'text-success-600 dark:text-success-400'
                        }`}>
                          {rec.nr_valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}