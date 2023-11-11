import React from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";

import LineChart from "../../components/Charts/LineChart";
import ColumnWithDataLabelsChart from "../../components/Charts/ColumnWithDataLabelsChart";
import ColumnWithMarkers from "../../components/Charts/ColumnWithMarkers";
import AreaStackedChart from "../../components/Charts/AreaStackedChart";
import SimplePieChart from "../../components/Charts/SimplePieChart";



import './styles.css';

export default function Home() {
    return (
        <div >
            <Header/>
            <div className="grid md:grid-cols-4 gap-4">

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white ">
                    <Card title="Entradas (Mês)" value={7000.00}/>
                    <Card title="Saídas (Mês)" value={5366.88}/>
                    <Card title="Saldo em Conta (Mês)" value={7000.00 - 5366.88}/>
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <LineChart color="#15c16b" title="Evolução de Renda"/>
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <LineChart color="#FFD700" title="Evolução de Despesas"/>
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <ColumnWithMarkers title="Metas de Gastos"  />
                </div>
                
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <Card title="Renda Total" value={10000}/>
                    <Card title="Investimento Total" value={35463}/>
                    <Card title="Dívida Acumulada" value={124124}/>
                </div>
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <AreaStackedChart title="Renda x Investimentos x Dívida Acumulada" />
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-5">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <Card title="Investimento em Renda Fixa" value={20}/>
                    <Card title="Investimenro em Renda Variavel" value={20}/>
                    <Card title="Investimento Total" value={20}/>
                </div>
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <ColumnWithDataLabelsChart title="Investimentos - Lucro Líquido" />
                </div>

                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <Card title="Reserva em Dólar" value={20}/>
                    <Card title="Reserva em Euro" value={20}/>
                    <Card title="Reserva em Bitcoin" value={20}/>
                </div>
                
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white ">
                    <ColumnWithDataLabelsChart title="Dólar / Euro / Bitocoin - Lucro Líquido" />
                </div>

                
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5 ">
                <div className="p-5 border dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white h-96 overflow-y-auto">
                    <Card title="Compra no débito" value={10000}/>
                    <Card title="Pix Enviado" value={35463}/>
                    <Card title="Compra no Crédito" value={124124}/>
                    <Card title="Boleto Pago" value={124124}/>
                    <Card title="Boleto Pago" value={124124}/>
                    <Card title="Compra no débito" value={124124}/>
                    <Card title="Compra no débito" value={124124}/>
                    <Card title="Compra no débito" value={124124}/>
                </div>
                <div className="p-5 border h-96 dark:border-black hover:border-green-600 dark:hover:border-green-600 rounded-lg dark:bg-slate-950 dark:bg-opacity-50 bg-white">
                    <SimplePieChart title="Renda x Investimentos x Dívida Acumulada" />
                </div>
            </div>

            {/* <div className="w-screen mt-5 bg-slate-950">
                <h1>Final</h1>
            </div> */}

        </div>
    );
}
