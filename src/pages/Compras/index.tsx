import React, { useState } from 'react';
import { HiUpload, HiChartBar, HiClock, HiTrendingUp } from 'react-icons/hi';
import UploadCSV from '../../components/Compras/UploadCSV';
import DashboardStats from '../../components/Compras/DashboardStats';
import HistoricoCargas from '../../components/Compras/HistoricoCargas';
import FiltroData from '../../components/Compras/FiltroData';
import AnalisesAvancadas from '../../components/Compras/AnalisesAvancadas';
import AnaliseQuantidades from '../../components/Compras/AnaliseQuantidades';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  {
    id: 'upload',
    label: 'Upload CSV',
    icon: HiUpload,
    component: UploadCSV
  },
  {
    id: 'dashboard',
    label: 'Estatísticas',
    icon: HiChartBar,
    component: DashboardStats
  },
  {
    id: 'historico',
    label: 'Histórico',
    icon: HiClock,
    component: HistoricoCargas
  },
  {
    id: 'filtros',
    label: 'Filtros',
    icon: HiTrendingUp,
    component: FiltroData
  },
  {
    id: 'quantidades',
    label: 'Quantidades',
    icon: HiChartBar,
    component: AnaliseQuantidades
  },
  {
    id: 'analises',
    label: 'Análises',
    icon: HiTrendingUp,
    component: AnalisesAvancadas
  }
];

export default function ComprasPage() {
  const [activeTab, setActiveTab] = useState('upload');

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component || UploadCSV;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Sistema de Compras
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Gerencie e analise suas compras com upload de CSV e estatísticas detalhadas
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-b-2 border-primary-500'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
