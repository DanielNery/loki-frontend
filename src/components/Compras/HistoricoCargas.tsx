import React, { useState } from 'react';
import { useCargas } from '../../hooks/useCompras';
import { HiDocumentText, HiCalendar, HiShoppingCart, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { LoadingSpinner } from '../LoadingSpinner';

interface CargaItemProps {
  carga: any;
  onToggleDetails: (id: number) => void;
  expandedCargas: Set<number>;
}

function CargaItem({ carga, onToggleDetails, expandedCargas }: CargaItemProps) {
  const isExpanded = expandedCargas.has(carga.id);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const valorTotal = carga.itens.reduce((sum: number, item: any) => sum + (item.preco_total || item.preco || 0), 0);

  return (
    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
            <HiDocumentText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {carga.arquivo_original}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <HiCalendar className="h-4 w-4" />
                <span>{new Date(carga.data_carregamento).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <HiShoppingCart className="h-4 w-4" />
                <span>{carga.total_itens} itens</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-success-600 dark:text-success-400">
            {formatCurrency(valorTotal)}
          </p>
          <button
            onClick={() => onToggleDetails(carga.id)}
            className="flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            <span>{isExpanded ? 'Ocultar' : 'Ver'} detalhes</span>
            {isExpanded ? (
              <HiChevronUp className="h-4 w-4" />
            ) : (
              <HiChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Detalhes Expandidos */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Total de Itens</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {carga.total_itens}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Valor Total</p>
                <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                  {formatCurrency(valorTotal)}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Valor Médio</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(valorTotal / carga.total_itens)}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Itens da Carga
              </h4>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {carga.itens.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
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
                            {item.quantidade ? `${item.quantidade} ${item.unidade || ''}` : '1 un'} • {new Date(item.data_carregamento).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(item.preco_total || item.preco || 0)}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatCurrency(item.preco_unitario || item.preco || 0)}/un
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HistoricoCargas() {
  const { cargas, loading, error } = useCargas();
  const [expandedCargas, setExpandedCargas] = useState<Set<number>>(new Set());

  const toggleDetails = (cargaId: number) => {
    const newExpanded = new Set(expandedCargas);
    if (newExpanded.has(cargaId)) {
      newExpanded.delete(cargaId);
    } else {
      newExpanded.add(cargaId);
    }
    setExpandedCargas(newExpanded);
  };

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

  if (!cargas || cargas.length === 0) {
    return (
      <div className="text-center py-12">
        <HiDocumentText className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Nenhuma carga encontrada
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Faça upload de um arquivo CSV para ver o histórico de cargas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Histórico de Cargas
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {cargas.length} carga{cargas.length !== 1 ? 's' : ''} encontrada{cargas.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {cargas.map((carga) => (
          <CargaItem
            key={carga.id}
            carga={carga}
            onToggleDetails={toggleDetails}
            expandedCargas={expandedCargas}
          />
        ))}
      </div>
    </div>
  );
}
