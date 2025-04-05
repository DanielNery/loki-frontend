import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { usePrices } from "../../hooks/usePrices";
import { usePix } from "../../hooks/usePix";
import { useBalance } from "../../hooks/useBalance";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import LineChart from "../../components/Charts/LineChart";
import ColumnWithDataLabelsChart from "../../components/Charts/ColumnWithDataLabelsChart";
import ColumnWithMarkers from "../../components/Charts/ColumnWithMarkers";
import AreaStackedChart from "../../components/Charts/AreaStackedChart";
import SimplePieChart from "../../components/Charts/SimplePieChart";

import './styles.css';

interface TransactionData {
    date: string;
    value: number;
}

const groupByMonth = (data: TransactionData[]) => {
    const groupedData: { [key: string]: number } = {};

    data.forEach(item => {
        const month = item.date.slice(0, 7); // Extract the year and month (YYYY-MM)
        if (!groupedData[month]) {
            groupedData[month] = 0;
        }
        groupedData[month] += item.value;
    });

    return Object.keys(groupedData).map(month => ({
        date: month,
        value: groupedData[month]
    }));
};

export default function Home() {
    const { prices, loading: pricesLoading, error: pricesError } = usePrices();
    const { pix, loading: pixLoading, error: pixError } = usePix(0, 1000, "2000-01-01T00:00:00.000Z", "2100-01-01T00:00:00.000Z");
    const { balance, loading: balanceLoading, error: balanceError } = useBalance();

    const [incomeData, setIncomeData] = useState<TransactionData[]>([]);
    const [expenseData, setExpenseData] = useState<TransactionData[]>([]);

    useEffect(() => {
        if (pix) {
            const income = pix.filter(transaction => transaction.type === "received").map(transaction => ({
                date: transaction.horario.liquidacao || transaction.horario.solicitacao || transaction.horario,
                value: parseFloat(transaction.valor)
            }));
            const expenses = pix.filter(transaction => transaction.type === "send").map(transaction => ({
                date: transaction.horario.liquidacao || transaction.horario.solicitacao || transaction.horario,
                value: parseFloat(transaction.valor)
            }));
            setIncomeData(groupByMonth(income));
            setExpenseData(groupByMonth(expenses));
        }
    }, [pix]);

    return (
        <div>
            <Header />
            <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    {pricesLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <Card title="Dólar/Real" value={prices ? prices.USDBRL : 0} />
                            <Card title="Bitcoin/Real" value={prices ? prices.BTCBRL : 0} />
                            <Card title="Dólar/Bitcoin" value={prices ? prices.USDBTC : 0} />
                        </>
                    )}
                    {pricesError && <p className="text-red-500">Failed to fetch prices</p>}
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    {pixLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <LineChart color="#15c16b" title="Evolução de Renda" data={incomeData} />
                    )}
                    {pixError && <p className="text-red-500">Failed to fetch PIX data</p>}
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    {pixLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <LineChart color="#FFD700" title="Evolução de Despesas" data={expenseData} />
                    )}
                    {pixError && <p className="text-red-500">Failed to fetch PIX data</p>}
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <ColumnWithMarkers title="Metas de Gastos" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    {balanceLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <Card title="Saldo Total" value={balance ? balance.saldo : 0} />
                        </>
                    )}
                    {balanceError && <p className="text-red-500">Failed to fetch balance</p>}
                </div>
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <AreaStackedChart title="Renda x Investimentos x Dívida Acumulada" />
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-5">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <Card title="Investimento em Renda Fixa" value={20} />
                    <Card title="Investimento em Renda Variável" value={20} />
                    <Card title="Investimento Total" value={20} />
                </div>
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <ColumnWithDataLabelsChart title="Investimentos - Lucro Líquido" />
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <Card title="Reserva em Dólar" value={20} />
                    <Card title="Reserva em Euro" value={20} />
                    <Card title="Reserva em Bitcoin" value={20} />
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white ">
                    <Card title="Entradas (Mês)" value={7000.00} />
                    <Card title="Saídas (Mês)" value={5366.88} />
                    <Card title="Saldo em Conta (Mês)" value={7000.00 - 5366.88} />
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white ">
                    <ColumnWithDataLabelsChart title="Dólar / Euro / Bitcoin - Lucro Líquido" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5 ">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white h-96 overflow-y-auto">
                    <Card title="Compra no débito" value={10000} />
                    <Card title="Pix Enviado" value={35463} />
                    <Card title="Compra no Crédito" value={124124} />
                    <Card title="Boleto Pago" value={124124} />
                    <Card title="Boleto Pago" value={124124} />
                    <Card title="Compra no débito" value={124124} />
                    <Card title="Compra no débito" value={124124} />
                    <Card title="Compra no débito" value={124124} />
                </div>
                <div className="p-5 border h-96 dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <SimplePieChart title="Renda x Investimentos x Dívida Acumulada" />
                </div>
            </div>
        </div>
    );
}
