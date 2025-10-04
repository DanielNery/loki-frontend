import React, { useState } from "react";
import { BsFillLightbulbFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import LokiIcon from '../../assets/loki_icon.svg'
import { useTheme } from "../../hooks/useTheme";
import SideBar from "../Sidebar";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Header principal */}
            <header className="sticky top-0 z-40 w-full glass-strong border-b border-white/20 dark:border-slate-700/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Menu hambúrguer */}
                        <div className="flex items-center">
                            <button
                                onClick={handleMenuToggle}
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                aria-label="Abrir menu"
                            >
                                <HiOutlineMenuAlt3 className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                            </button>
                        </div>

                        {/* Logo central */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img 
                                    src={LokiIcon} 
                                    alt="Loki Finance" 
                                    className="h-12 w-12 lg:h-16 lg:w-16 object-contain transition-transform duration-300 hover:scale-110" 
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-20 blur-sm"></div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl lg:text-2xl font-bold text-gradient">
                                    Loki Finance
                                </h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Monitoramento Pessoal
                                </p>
                            </div>
                        </div>

                        {/* Toggle de tema */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50 group"
                                aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                            >
                                {theme === "light" ? (
                                    <MdDarkMode className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-primary-600 transition-colors duration-300" />
                                ) : (
                                    <BsFillLightbulbFill className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-primary-400 transition-colors duration-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Overlay do menu */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
                    onClick={handleMenuToggle}
                />
            )}

            {/* Sidebar */}
            <SideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}