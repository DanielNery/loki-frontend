import React, { useState } from 'react';
import { useComprasPorData } from '../../hooks/useCompras';
import { HiCalendar, HiSearch, HiRefresh } from 'react-icons/hi';
import { LoadingSpinner } from '../LoadingSpinner';

export default function FiltroData() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [limite, setLimite] = useState(100);
  const { compras, loading, error, fetchCompras } = useComprasPorData();

  const handleBuscar = async () => {
    await fetchCompras(dataInicio, dataFim, limite);
  };

  const handleLimpar = () => {
    setDataInicio('');
    setDataFim('');
    setLimite(100);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const valorTotal = compras.reduce((sum, compra) => sum + (compra.preco_total || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Filtrar Compras por Data
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Busque compras específicas por período de tempo.
        </p>
      </div>

      {/* Filtros */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Data Início
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Data Fim
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Limite de Resultados
            </label>
            <select
              value={limite}
              onChange={(e) => setLimite(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value={50}>50 itens</option>
              <option value={100}>100 itens</option>
              <option value={200}>200 itens</option>
              <option value={500}>500 itens</option>
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={handleBuscar}
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <HiSearch className="h-4 w-4" />
                  <span>Buscar</span>
                </>
              )}
            </button>
            <button
              onClick={handleLimpar}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <HiRefresh className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {error && (
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-accent-500">
          <p className="text-accent-600 dark:text-accent-400">{error}</p>
        </div>
      )}

      {compras.length > 0 && (
        <div className="space-y-4">
          {/* Resumo dos Resultados */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {compras.length}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Itens encontrados
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                  {formatCurrency(valorTotal)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Valor total
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(valorTotal / compras.length)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Valor médio
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Compras */}
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Resultados da Busca
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {compras.map((compra, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {compra.nome_pesquisa}
                          </p>
                          <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                            <HiCalendar className="h-4 w-4" />
                            <span>{compra.quantidade ? `${compra.quantidade} ${compra.unidade || ''}` : '1 un'} • {new Date(compra.data_carregamento).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(compra.preco_total || 0)}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatCurrency(compra.preco_unitario || 0)}/un
                        </p>
                      </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {compras.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <HiCalendar className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Nenhuma compra encontrada
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Tente ajustar os filtros de data para encontrar compras.
          </p>
        </div>
      )}
    </div>
  );
}
