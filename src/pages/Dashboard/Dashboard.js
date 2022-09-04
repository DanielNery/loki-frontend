import React from "react";
import Header from "../../components/Header/Header";
import Line from "../../components/Grafico/Line";
import Candle from "../../components/Grafico/Candle";



import greenTree from '../../assets/green-tree.svg';
import greenCard from '../../assets/green-card.svg';

function Dashboard() {
    return (

        <div className="container-fluid">
            <Header/>
            
            <div className="grid grid-cols-12 gap-5 p-5">
                
                <div className="col-span-6 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                    <div className="text-white">
                        <h1 className="text-2xl text-center font-semibold">Gráfico de Receitas</h1>
                        <h2 className="text-xl text-center">Evolução das Receitas</h2>
                        <div className="container mt-5">
                            <Line className="z-10"/>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10 p-5">
                    <div className="grid grid-cols-6 gap-5  mt-6">

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Saldo Total</h1>
                                <h2 className="text-xl text-center">Saldo em conta corrente</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Total Investido</h1>
                                <h2 className="text-xl text-center">Patrimonio investido</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Dividendos Médio</h1>
                                <h2 className="text-xl text-center">Média de Dividendos Recebidos por Mês</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Total de Gasto</h1>
                                <h2 className="text-xl text-center">Soma dos Gastos no mês</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-span-6 mt-5 mb-5">
                    <div>
                        <img src={greenTree} alt="" />
                    </div>
                </div>

                <div className="col-span-6 mt-5 mb-5">
                    <div>
                    <img src={greenCard} alt="" />
                    </div>
                </div>

                <div className="col-span-6 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10 p-5">
                    <div className="grid grid-cols-6 gap-5  mt-6">

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Dólar Hoje</h1>
                                <h2 className="text-xl text-center">Saldo em conta corrente</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Total Investido</h1>
                                <h2 className="text-xl text-center">Patrimonio investido</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Dividendos Médio</h1>
                                <h2 className="text-xl text-center">Média de Dividendos Recebidos por Mês</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                            <div className="text-white">
                                <h1 className="text-2xl text-center font-semibold">Total de Gasto</h1>
                                <h2 className="text-xl text-center">Soma dos Gastos no mês</h2>
                                <div className="container mt-5 text-center mb-4">
                                    <h1 className="text-9xl font-bold text-green-500">R$00</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-span-6 hover:border hover:border-green-600 bg-gray-50 bg-opacity-10">
                    <div className="text-white">
                        <h1 className="text-2xl text-center font-semibold">Gráfico de Investimentos</h1>
                        <h2 className="text-xl text-center">Evolução dos Investimentos</h2>
                        <div className="container mt-5">
                            <Candle />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;