import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


interface SidebarProps {
    isOpen: boolean;
  }

export default function SideBar({ isOpen  }: SidebarProps) {

    return (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white text-green-600 dark:bg-black dark:text-green-600 p-4 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className=" text-white w-92 flex flex-col items-center">
            <h1 className="text-2xl font-bold my-6">Loki Menu</h1>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/entries" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link to="/investing" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Investimentos
                </Link>
              </li>
              <li>
                <Link to="/pagamentos" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Pagamentos Automatizados
                </Link>
              </li>
              <li>
                <Link to="/pagamentos" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Recebimentos Automatizados
                </Link>
              </li>
              <li>
                <Link to="/pagamentos" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Gerenciamento de Tempo
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center px-4 py-2 text-black dark:text-gray-500 hover:bg-gray-700 hover:text-white">
                  Configurações
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    
}