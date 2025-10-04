import React from 'react';
import { useEstatisticas, useItensMaisCaros, useItensMaisFrequentes } from '../../hooks/useCompras';
import { HiChartBar, HiTrendingUp, HiShoppingCart, HiCurrencyDollar } from 'react-icons/hi';
import { LoadingSpinner } from '../LoadingSpinner';

export default function AnalisesAvancadas() {
  const { estatisticas, loading: statsLoading } = useEstatisticas();
  const { itens: itensCaros, loading: carosLoading } = useItensMaisCaros(10);
  const { itens: itensFrequentes, loading: frequentesLoading } = useItensMaisFrequentes(10);

  const loading = statsLoading || carosLoading || frequentesLoading;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular estatísticas adicionais
  const precoMedio = estatisticas ? estatisticas.valor_total_gasto / estatisticas.total_itens : 0;
  const precoMaximo = itensCaros[0]?.preco_total || 0;
  const precoMinimo = itensCaros[itensCaros.length - 1]?.preco_total || 0;
  const amplitudePrecos = precoMaximo - precoMinimo;

  // Calcular distribuição de preços
  const distribuicaoPrecos = itensCaros.reduce((acc: any, item: any) => {
    const faixa = Math.floor((item.preco_total || 0) / 50) * 50; // Agrupar em faixas de R$ 50
    acc[faixa] = (acc[faixa] || 0) + 1;
    return acc;
  }, {});

  const faixasPreco = Object.entries(distribuicaoPrecos)
    .map(([faixa, count]) => ({
      faixa: parseInt(faixa),
      count: count as number
    }))
    .sort((a, b) => a.faixa - b.faixa);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Análises Avançadas
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Insights detalhados sobre seus padrões de compra.
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <HiCurrencyDollar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Preço Médio
            </h3>
          </div>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {formatCurrency(precoMedio)}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center">
              <HiTrendingUp className="h-5 w-5 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Amplitude de Preços
            </h3>
          </div>
          <p className="text-3xl font-bold text-success-600 dark:text-success-400">
            {formatCurrency(amplitudePrecos)}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-xl flex items-center justify-center">
              <HiChartBar className="h-5 w-5 text-warning-600 dark:text-warning-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Faixas de Preço
            </h3>
          </div>
          <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">
            {faixasPreco.length}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center">
              <HiShoppingCart className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Diversidade
            </h3>
          </div>
          <p className="text-3xl font-bold text-accent-600 dark:text-accent-400">
            {itensFrequentes.length}
          </p>
        </div>
      </div>

      {/* Distribuição de Preços */}
      <div className="glass-strong rounded-2xl p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
          <HiChartBar className="h-5 w-5 text-primary-500 mr-2" />
          Distribuição de Preços
        </h3>
        <div className="space-y-4">
          {faixasPreco.map((faixa, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-slate-600 dark:text-slate-400">
                {formatCurrency(faixa.faixa)} - {formatCurrency(faixa.faixa + 49)}
              </div>
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${(faixa.count / Math.max(...faixasPreco.map(f => f.count))) * 100}%`
                  }}
                />
              </div>
              <div className="w-8 text-sm font-medium text-slate-900 dark:text-slate-100">
                {faixa.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 Itens Mais Caros */}
      <div className="glass-strong rounded-2xl p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
          <HiTrendingUp className="h-5 w-5 text-accent-500 mr-2" />
          Top 10 Itens Mais Caros
        </h3>
        <div className="space-y-3">
          {itensCaros.map((item, index) => (
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
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
                  {formatCurrency(item.preco_total || 0)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {precoMaximo > 0 ? (((item.preco_total || 0) / precoMaximo) * 100).toFixed(1) : '0'}% do máximo
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 Itens Mais Frequentes */}
      <div className="glass-strong rounded-2xl p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
          <HiShoppingCart className="h-5 w-5 text-primary-500 mr-2" />
          Top 10 Itens Mais Frequentes
        </h3>
        <div className="space-y-3">
          {itensFrequentes.map((item, index) => (
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
                    {formatCurrency(item.preco_unitario_medio || 0)} médio
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {item.vezes_comprado}x
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formatCurrency(item.preco_total_gasto)} total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            💡 Insights
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>
              • Seu item mais caro custa <strong>{formatCurrency(precoMaximo)}</strong>
            </p>
            <p>
              • Você compra em média <strong>{formatCurrency(precoMedio)}</strong> por item
            </p>
            <p>
              • Sua faixa de preços varia em <strong>{formatCurrency(amplitudePrecos)}</strong>
            </p>
            <p>
              • Você tem <strong>{itensFrequentes.length}</strong> produtos únicos
            </p>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            🎯 Recomendações
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>
              • Considere comprar em maior quantidade para reduzir custos
            </p>
            <p>
              • Monitore itens que aparecem frequentemente nas compras
            </p>
            <p>
              • Analise se itens caros são realmente necessários
            </p>
            <p>
              • Estabeleça um orçamento baseado no preço médio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
