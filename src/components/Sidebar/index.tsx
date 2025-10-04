import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiCurrencyDollar, 
  HiDocumentText, 
  HiTrendingUp, 
  HiCalendar, 
  HiCog,
  HiX
} from 'react-icons/hi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: HiHome },
  { name: 'Extrato', href: '/extract', icon: HiDocumentText },
  { name: 'Investimentos', href: '/investing', icon: HiTrendingUp },
  { name: 'Compras', href: '/compras', icon: HiCurrencyDollar },
  { name: 'Hábitos', href: '/habits', icon: HiCalendar },
  { name: 'Configurações', href: '/settings', icon: HiCog },
];

export default function SideBar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 glass-strong border-r border-white/20 dark:border-slate-700/50 z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {/* Header da sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Loki Finance</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Menu Principal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            aria-label="Fechar menu"
          >
            <HiX className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Icon 
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                  }`} 
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer da sidebar */}
        <div className="p-4 border-t border-white/20 dark:border-slate-700/50">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Versão 1.0.0
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              © 2024 Loki Finance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}