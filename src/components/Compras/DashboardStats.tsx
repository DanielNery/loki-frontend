import React from 'react';
import { useEstatisticas } from '../../hooks/useCompras';
import { HiTrendingUp, HiShoppingCart, HiCurrencyDollar, HiChartBar } from 'react-icons/hi';
import Card from '../Card';
import { LoadingSpinner } from '../LoadingSpinner';

export default function DashboardStats() {
  const { estatisticas, loading, error } = useEstatisticas();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-accent-600 dark:text-accent-400">{error}</p>
      </div>
    );
  }

  if (!estatisticas) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">Nenhum dado disponível</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Gasto"
          value={formatCurrency(estatisticas.valor_total_gasto)}
          IconComponent={<HiCurrencyDollar className="h-6 w-6 text-success-500" />}
          variant="success"
        />
        <Card
          title="Total de Itens"
          value={estatisticas.total_itens.toLocaleString('pt-BR')}
          IconComponent={<HiShoppingCart className="h-6 w-6 text-primary-500" />}
          variant="info"
        />
        <Card
          title="Cargas Realizadas"
          value={estatisticas.total_cargas.toString()}
          IconComponent={<HiChartBar className="h-6 w-6 text-warning-500" />}
          variant="warning"
        />
        <Card
          title="Média por Item"
          value={formatCurrency(estatisticas.valor_total_gasto / estatisticas.total_itens)}
          IconComponent={<HiTrendingUp className="h-6 w-6 text-accent-500" />}
          variant="danger"
        />
      </div>

      {/* Seção de Análises */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top 5 Itens Mais Caros */}
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
            <HiTrendingUp className="h-5 w-5 text-accent-500 mr-2" />
            Top 5 Itens Mais Caros
          </h3>
          <div className="space-y-4">
            {estatisticas.itens_mais_caros.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-accent-600 dark:text-accent-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {item.nome_pesquisa}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quantidade ? `${item.quantidade} ${item.unidade || ''}` : '1 un'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
                    {formatCurrency(item.preco_total || 0)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatCurrency(item.preco_unitario || 0)}/un
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Itens Mais Frequentes */}
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
            <HiShoppingCart className="h-5 w-5 text-primary-500 mr-2" />
            Top 5 Itens Mais Frequentes
          </h3>
          <div className="space-y-4">
            {estatisticas.itens_mais_frequentes.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {item.nome_pesquisa}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quantidade_total || 0} {item.unidade || 'un'} • {formatCurrency(item.preco_unitario_medio || 0)}/un
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {item.vezes_comprado || 0}x
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatCurrency(item.preco_total_gasto || 0)} total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estatísticas Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Distribuição de Preços
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Item mais caro:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatCurrency(estatisticas.itens_mais_caros[0]?.preco_total || 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Item mais barato:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatCurrency(estatisticas.itens_mais_caros[estatisticas.itens_mais_caros.length - 1]?.preco_total || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Frequência de Compras
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Item mais comprado:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {estatisticas.itens_mais_frequentes[0]?.vezes_comprado || 0}x
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Total de produtos únicos:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {estatisticas.itens_mais_frequentes.length}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Resumo Geral
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Média por carga:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {Math.round(estatisticas.total_itens / estatisticas.total_cargas)} itens
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Valor médio por carga:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatCurrency(estatisticas.valor_total_gasto / estatisticas.total_cargas)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
