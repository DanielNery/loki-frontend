import React, { useState, useEffect } from 'react';
import { useComprasPorData } from '../../hooks/useCompras';
import { HiChartBar, HiTrendingUp, HiShoppingCart, HiCurrencyDollar } from 'react-icons/hi';
import { LoadingSpinner } from '../LoadingSpinner';

interface ProdutoAnalise {
  nome: string;
  quantidade_total: number;
  unidade: string;
  preco_total: number;
  vezes_comprado: number;
  preco_unitario_medio: number;
}

export default function AnaliseQuantidades() {
  const { compras, loading, error, fetchCompras } = useComprasPorData();
  const [analise, setAnalise] = useState<ProdutoAnalise[]>([]);
  const [analisando, setAnalisando] = useState(false);

  const analisarQuantidades = async () => {
    setAnalisando(true);
    try {
      await fetchCompras(undefined, undefined, 1000); // Buscar mais itens para análise
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setAnalisando(false);
    }
  };

  useEffect(() => {
    if (compras.length > 0) {
      // Agrupar por produto e somar quantidades
      const produtos: { [key: string]: ProdutoAnalise } = {};
      
      compras.forEach(compra => {
        const nome = compra.nome_pesquisa;
        if (!produtos[nome]) {
          produtos[nome] = {
            nome,
            quantidade_total: 0,
            unidade: compra.unidade,
            preco_total: 0,
            vezes_comprado: 0,
            preco_unitario_medio: 0
          };
        }
        
        produtos[nome].quantidade_total += (compra.quantidade || 1);
        produtos[nome].preco_total += (compra.preco_total || 0);
        produtos[nome].vezes_comprado += 1;
      });

      // Calcular preço unitário médio
      Object.values(produtos).forEach(produto => {
        produto.preco_unitario_medio = produto.preco_total / produto.quantidade_total;
      });

      // Ordenar por quantidade total
      const topQuantidades = Object.values(produtos)
        .sort((a, b) => b.quantidade_total - a.quantidade_total)
        .slice(0, 20);

      setAnalise(topQuantidades);
    }
  }, [compras]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalQuantidade = analise.reduce((sum, item) => sum + item.quantidade_total, 0);
  const totalGasto = analise.reduce((sum, item) => sum + item.preco_total, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Análise de Quantidades
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Análise detalhada dos produtos por quantidade total comprada.
        </p>
      </div>

      {/* Botão de análise */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Executar Análise
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Analise os produtos por quantidade total comprada
            </p>
          </div>
          <button
            onClick={analisarQuantidades}
            disabled={analisando || loading}
            className="btn-primary flex items-center space-x-2"
          >
            {analisando || loading ? (
              <>
                <LoadingSpinner />
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <HiChartBar className="h-4 w-4" />
                <span>Analisar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resumo da análise */}
      {analise.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-strong rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                <HiShoppingCart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Total de Produtos
              </h3>
            </div>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {analise.length}
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center">
                <HiTrendingUp className="h-5 w-5 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Quantidade Total
              </h3>
            </div>
            <p className="text-3xl font-bold text-success-600 dark:text-success-400">
              {totalQuantidade.toFixed(1)}
            </p>
          </div>

          <div className="glass-strong rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/30 rounded-xl flex items-center justify-center">
                <HiCurrencyDollar className="h-5 w-5 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Valor Total
              </h3>
            </div>
            <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">
              {formatCurrency(totalGasto)}
            </p>
          </div>
        </div>
      )}

      {/* Lista de produtos */}
      {analise.length > 0 && (
        <div className="glass-strong rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
            <HiChartBar className="h-5 w-5 text-primary-500 mr-2" />
            Top 20 Produtos por Quantidade
          </h3>
          <div className="space-y-4">
            {analise.map((produto, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {produto.nome}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>{produto.vezes_comprado}x comprado</span>
                      <span>•</span>
                      <span>{formatCurrency(produto.preco_unitario_medio)}/un</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {produto.quantidade_total} {produto.unidade}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatCurrency(produto.preco_total)} total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem quando não há dados */}
      {analise.length === 0 && !loading && !analisando && (
        <div className="text-center py-12">
          <HiChartBar className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Nenhuma análise disponível
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Execute a análise para ver os produtos por quantidade.
          </p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-accent-500">
          <p className="text-accent-600 dark:text-accent-400">{error}</p>
        </div>
      )}
    </div>
  );
}
