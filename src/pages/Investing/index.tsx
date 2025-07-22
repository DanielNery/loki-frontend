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
    <>
      <Header />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Investimentos</h2>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Registros</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : records.length === 0 ? (
            <p>Nenhum registro encontrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-slate-900 rounded shadow">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Produto</th>
                    <th className="px-4 py-2">Instituição</th>
                    <th className="px-4 py-2">Quantidade</th>
                    <th className="px-4 py-2">Preço</th>
                    <th className="px-4 py-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec._id} className="border-t">
                      <td className="px-4 py-2">{rec.dt_negocio?.slice(0, 10)}</td>
                      <td className="px-4 py-2">{rec.tp_movimentacao}</td>
                      <td className="px-4 py-2">{rec.nm_produto}</td>
                      <td className="px-4 py-2">{rec.nm_instituicao}</td>
                      <td className="px-4 py-2">{rec.nr_quantidade}</td>
                      <td className="px-4 py-2">{rec.nr_preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td className={`px-4 py-2 font-bold ${rec.nr_valor < 0 ? 'text-red-500' : 'text-green-600'}`}>{rec.nr_valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}