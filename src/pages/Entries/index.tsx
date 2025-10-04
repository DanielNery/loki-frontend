import React, { useState } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort, faArrowDownWideShort, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { usePix } from "../../hooks/usePix";
import DateFilter from "../../components/DateFilter";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function Entries() {
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(10);
    const [startDate, setStartDate] = useState("2022-01-15T00:00:00.000Z");
    const [endDate, setEndDate] = useState("2025-12-19T23:00:00.000Z");

    const { pix, loading, error } = usePix(page, itemsPerPage, startDate, endDate);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const totalEntradas = pix
        .filter(transaction => transaction.type === "received")
        .reduce((acc, transaction) => acc + parseFloat(transaction.valor), 0);

    const totalSaidas = pix
        .filter(transaction => transaction.type === "send")
        .reduce((acc, transaction) => acc + parseFloat(transaction.valor), 0);

    const saldo = totalEntradas - totalSaidas;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Seção de filtros */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        Lançamentos PIX
                    </h1>
                    <div className="glass-strong rounded-2xl p-6">
                        <DateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
                    </div>
                </div>

                {/* Cards de resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card 
                        title="Entradas" 
                        value={formatCurrency(totalEntradas)} 
                        IconComponent={<FontAwesomeIcon icon={faArrowUpWideShort} />}
                        variant="success"
                        trend="up"
                    />
                    <Card 
                        title="Saídas" 
                        value={formatCurrency(-totalSaidas)} 
                        IconComponent={<FontAwesomeIcon icon={faArrowDownWideShort} />}
                        variant="danger"
                        trend="down"
                    />
                    <Card 
                        title="Saldo" 
                        value={formatCurrency(saldo)} 
                        IconComponent={<FontAwesomeIcon icon={faMoneyBillTransfer} />}
                        variant={saldo < 0 ? 'danger' : 'success'}
                        trend={saldo < 0 ? 'down' : 'up'}
                    />
                </div>

                {/* Tabela de transações */}
                <div className="glass-strong rounded-2xl overflow-hidden animate-slide-up">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        EndToEndId
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Valor
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Horário
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Favorecido
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <LoadingSpinner />
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-accent-600 dark:text-accent-400">
                                            Erro ao carregar transações PIX
                                        </td>
                                    </tr>
                                ) : pix.length > 0 ? (
                                    pix.map((transaction, index) => (
                                        <tr key={transaction.endToEndId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200">
                                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-mono">
                                                {transaction.endToEndId}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`font-bold ${
                                                    transaction.type === "send" 
                                                        ? 'text-accent-600 dark:text-accent-400' 
                                                        : 'text-success-600 dark:text-success-400'
                                                }`}>
                                                    {formatCurrency(transaction.type === "send" ? -parseFloat(transaction.valor) : parseFloat(transaction.valor))}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {transaction.horario.liquidacao || transaction.horario.solicitacao || transaction.horario}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                                                {transaction.favorecido?.identificacao?.nome || "DANIEL PONTES NERY"}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    transaction.type === "send"
                                                        ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400'
                                                        : 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400'
                                                }`}>
                                                    <FontAwesomeIcon 
                                                        icon={transaction.type === "send" ? faArrowUpWideShort : faArrowDownWideShort} 
                                                        className="mr-1"
                                                    />
                                                    {transaction.type === "send" ? "Enviado" : "Recebido"}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                            Nenhuma transação encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Paginação */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button 
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))} 
                        disabled={page === 0}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium">
                        Página {page + 1}
                    </span>
                    <button 
                        onClick={() => setPage((prev) => prev + 1)}
                        className="btn-secondary"
                    >
                        Próxima
                    </button>
                </div>
            </main>
        </div>
    );
}
