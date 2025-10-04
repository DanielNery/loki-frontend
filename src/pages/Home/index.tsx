import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { usePrices } from "../../hooks/usePrices";
import { useBalance } from "../../hooks/useBalance";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import InvestmentPositions from "../../components/InvestmentPositions";

import LineChart from "../../components/Charts/LineChart";
import ColumnWithDataLabelsChart from "../../components/Charts/ColumnWithDataLabelsChart";
import ColumnWithMarkers from "../../components/Charts/ColumnWithMarkers";
import AreaStackedChart from "../../components/Charts/AreaStackedChart";
import SimplePieChart from "../../components/Charts/SimplePieChart";
import BarChart from "../../components/Charts/BarChart";
import HabitsDonutChart from "../../components/Charts/HabitsDonutChart";
import { FaRegCalendarCheck } from 'react-icons/fa';

import './styles.css';

interface TransactionData {
    date: string;
    value: number;
}

// Função utilitária para converter o resumo mensal em array para gráficos
function resumeToSeries(resume: any, key: string) {
    if (!resume) return [];
    return Object.entries(resume).map(([date, obj]: [string, any]) => ({
        date,
        value: obj[key] || 0
    }));
}

// Função para preparar dados para o AreaStackedChart
function getAreaStackedSeries(resume: any) {
    if (!resume) return [];
    const meses = Object.keys(resume);
    return [
        {
            name: 'Compras',
            data: meses.map(m => resume[m].compras || 0)
        },
        {
            name: 'Vendas',
            data: meses.map(m => resume[m].vendas || 0)
        },
        {
            name: 'Saldo Investido',
            data: meses.map(m => resume[m].saldo_investido || 0)
        }
    ];
}

// Função para preparar categorias (meses)
function getResumeMonths(resume: any) {
    if (!resume) return [];
    return Object.keys(resume);
}

// Função para preparar dados para o ColumnWithDataLabelsChart
function getTotalsForColumnChart(totals: any) {
    if (!totals) return { series: [], categories: [] };
    const keys = [
        { key: 'total_cdb', label: 'CDB' },
        { key: 'total_crypto', label: 'Crypto' },
        { key: 'total_dolar', label: 'Dólar' },
        { key: 'total_recebiveis', label: 'Recebíveis' }
    ];
    return {
        series: [{
            name: 'Total',
            data: keys.map(k => totals[k.key] || 0)
        }],
        categories: keys.map(k => k.label)
    };
}

// Função para preparar dados para gráfico de receitas e despesas mensais
function getReceitasDespesasBarData(resume: any) {
    if (!resume) return { categories: [], receitas: [], despesas: [] };
    const categories = Object.keys(resume);
    const receitas = categories.map(mes => resume[mes].total_receitas || 0);
    const despesas = categories.map(mes => resume[mes].total_despesas || 0);
    return { categories, receitas, despesas };
}

// Função para preparar dados para gráfico de freelance e imposto mensal
function getFreelanceImpostoBarData(resume: any) {
    if (!resume) return { categories: [], freelance: [], imposto: [] };
    const categories = Object.keys(resume);
    const freelance = categories.map(mes => resume[mes].total_freelance || 0);
    const imposto = categories.map(mes => resume[mes].imposto_aproximado || 0);
    return { categories, freelance, imposto };
}

export default function Home() {
    const { prices, loading: pricesLoading, error: pricesError } = usePrices();
    const { balance, loading: balanceLoading, error: balanceError } = useBalance();
    const navigate = useNavigate();

    const [investingTotals, setInvestingTotals] = useState<any>(null);
    const [investingResume, setInvestingResume] = useState<any>(null);
    const [currentPositions, setCurrentPositions] = useState<any>(null);
    const [investingLoading, setInvestingLoading] = useState(false);
    const [investingError, setInvestingError] = useState('');

    const [extractResume, setExtractResume] = useState<any>(null);
    const [extractTotals, setExtractTotals] = useState<any>(null);
    const [extractLoading, setExtractLoading] = useState(false);
    const [extractError, setExtractError] = useState('');

    const [maioresDespesas, setMaioresDespesas] = useState<any[]>([]);
    const [maioresReceitas, setMaioresReceitas] = useState<any[]>([]);

    const [notionResume, setNotionResume] = useState<any>(null);
    const [notionLoading, setNotionLoading] = useState(false);
    const [notionError, setNotionError] = useState('');

    const [fixedExpenses, setFixedExpenses] = useState<any[]>([]);
    const [fixedExpensesLoading, setFixedExpensesLoading] = useState(false);
    const [fixedExpensesError, setFixedExpensesError] = useState('');

    const barData = getReceitasDespesasBarData(extractResume);
    const freelanceImpostoBarData = getFreelanceImpostoBarData(extractResume);

    useEffect(() => {
        setInvestingLoading(true);
        api.get('/api/v1/investing/resume')
            .then(res => {
                setInvestingTotals(res.data.totais);
                setInvestingResume(res.data.resumo_mensal);
                setCurrentPositions(res.data.posicao_atual?.ativos);
            })
            .catch((err) => {
                if (err?.response?.status === 403) navigate('/login');
                setInvestingError('Erro ao buscar resumo de investimentos');
            })
            .finally(() => setInvestingLoading(false));
    }, [navigate]);

    useEffect(() => {
        setExtractLoading(true);
        api.get('/api/v1/extract/resume')
            .then(res => {
                setExtractResume(res.data.resumo_por_periodo);
                setExtractTotals(res.data.total_geral);
                setMaioresDespesas(res.data.maiores_despesas || []);
                setMaioresReceitas(res.data.maiores_receitas || []);
            })
            .catch((err) => {
                if (err?.response?.status === 403) navigate('/login');
                setExtractError('Erro ao buscar resumo de receitas/despesas');
            })
            .finally(() => setExtractLoading(false));
    }, [navigate]);

    useEffect(() => {
        setNotionLoading(true);
        api.get('/api/v1/notion/resume')
            .then(res => setNotionResume(res.data))
            .catch((err) => {
                if (err?.response?.status === 403) navigate('/login');
                setNotionError('Erro ao buscar hábitos');
            })
            .finally(() => setNotionLoading(false));
    }, [navigate]);

    useEffect(() => {
        setFixedExpensesLoading(true);
        api.get('/api/v1/extract/fixed-expenses')
            .then(res => setFixedExpenses(res.data))
            .catch(() => setFixedExpensesError('Erro ao buscar despesas fixas.'))
            .finally(() => setFixedExpensesLoading(false));
    }, []);

    function extractToSeries(resume: any, key: string) {
        if (!resume) return [];
        return Object.entries(resume).map(([date, obj]: [string, any]) => ({
            date,
            value: obj[key] || 0
        }));
    }
    function extractMonths(resume: any) {
        if (!resume) return [];
        return Object.keys(resume);
    }
    function getExtractAreaSeries(resume: any) {
        if (!resume) return [];
        const meses = Object.keys(resume);
        return [
            {
                name: 'Receitas',
                data: meses.map(m => resume[m].total_receitas || 0)
            },
            {
                name: 'Despesas',
                data: meses.map(m => resume[m].total_despesas || 0)
            },
            {
                name: 'Investimentos',
                data: meses.map(m => resume[m].total_investimentos || 0)
            },
            {
                name: 'Saldo',
                data: meses.map(m => resume[m].saldo || 0)
            }
        ];
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Header />
            
            {/* Container principal */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Seção de boas-vindas */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Dashboard Financeiro
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Acompanhe sua vida financeira e hábitos em tempo real
                    </p>
                </div>

                {/* Grid de gráficos principais */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {/* Gráfico de rosca de ativos */}
                    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Participação dos Ativos
                        </h3>
                    {currentPositions && Object.keys(currentPositions).length > 0 && (() => {
                        const ativos = Object.entries(currentPositions)
                            .map(([k, v]) => [k, parseFloat(String(v).replace(/[^0-9\,\.\-]/g, '').replace(',', '.'))] as [string, number])
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 10);
                        const labels = ativos.map(([k]) => k);
                        const series = ativos.map(([, v]) => v);
                        return (
                            <SimplePieChart
                                    title=""
                                labels={labels}
                                series={series}
                                    height={400}
                                width={"100%"}
                                valueFormatter={val => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}
                            />
                        );
                    })()}
                </div>
                    
                {/* Gráfico de linha de receitas */}
                    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Evolução das Receitas
                        </h3>
                    <LineChart
                            title=""
                            color="#22c55e"
                        data={extractToSeries(extractResume, 'total_receitas')}
                    />
                </div>
                {/* Gráfico de barras de hábitos */}
                    <div className="chart-container animate-slide-up">
                    {notionLoading ? <LoadingSpinner /> : notionResume && (
                        <BarChart
                            title="Progresso por Hábito"
                            categories={["Jiu Jitsu", "Muay Thai", "Natação", "Corrida", "Boxe", "Musculação"]}
                            data={[
                                notionResume.total_jiu_jitsu_progress,
                                notionResume.total_muay_thai_progress,
                                notionResume.total_natacao_progress,
                                notionResume.total_corrida_progress,
                                notionResume.total_boxe_progress,
                                notionResume.total_musculacao_progress,
                            ]}
                                height={400}
                            width="100%"
                        />
                    )}
                </div>
                    
                {/* Gráfico de linha de despesas */}
                    <div className="chart-container animate-slide-up">
                    <LineChart
                        title="Evolução das Despesas"
                            color="#ef4444"
                        data={extractToSeries(extractResume, 'total_despesas')}
                    />
                    </div>
                </div>

                {/* Segunda linha de gráficos */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {/* Gráfico de área de evolução geral */}
                    <div className="chart-container animate-slide-up">
                    <AreaStackedChart
                        title="Evolução Receitas, Despesas, Investimentos e Saldo"
                        series={getExtractAreaSeries(extractResume)}
                        categories={extractMonths(extractResume)}
                    />
                </div>
                    
                {/* Gráfico de linha de saldo */}
                    <div className="chart-container animate-slide-up">
                    <LineChart
                        title="Evolução do Saldo por Período"
                            color="#3b82f6"
                        data={extractToSeries(extractResume, 'saldo')}
                    />
                    </div>
                </div>

                {/* Terceira linha de gráficos */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {/* Gráfico de linha de investimentos */}
                    <div className="chart-container animate-slide-up">
                    <LineChart
                        title="Evolução dos Investimentos"
                            color="#06b6d4"
                        data={extractToSeries(extractResume, 'total_investimentos')}
                    />
                </div>
                    
                {/* Gráfico de rosca de hábitos */}
                <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        Distribuição dos Hábitos
                    </h3>
                    {notionLoading ? <LoadingSpinner /> : notionResume && (
                        <HabitsDonutChart
                            title=""
                            categories={[
                                "Jiu Jitsu",
                                "Muay Thai",
                                "Boxe",
                                "Musculação",
                                "Natação",
                                "Corrida",
                            ]}
                            data={[
                                notionResume.total_jiu_jitsu_progress ?? 0,
                                notionResume.total_muay_thai_progress ?? 0,
                                notionResume.total_boxe_progress ?? 0,
                                notionResume.total_musculacao_progress ?? 0,
                                notionResume.total_natacao_progress ?? 0,
                                notionResume.total_corrida_progress ?? 0,
                            ]}
                            height={400}
                            width="100%"
                        />
                    )}
                </div>
                </div>

                {/* Quarta linha de gráficos */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {/* Gráfico de linha de freelance */}
                    <div className="chart-container animate-slide-up">
                    <LineChart
                        title="Evolução do Freelance"
                            color="#f59e0b"
                        data={extractToSeries(extractResume, 'total_freelance')}
                    />
                </div>
                    
                {/* Gráfico de linha de imposto */}
                    <div className="chart-container animate-slide-up">
                    <LineChart
                        title="Evolução do Imposto Aproximado"
                            color="#8b5cf6"
                        data={extractToSeries(extractResume, 'imposto_aproximado')}
                    />
                </div>
            </div>
                {/* Gráficos de barras mensais */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    <div className="chart-container animate-slide-up">
                    <BarChart
                        title="Receitas Mensais"
                        categories={barData.categories}
                        data={barData.receitas}
                        height={400}
                        width="100%"
                    />
                </div>
                    <div className="chart-container animate-slide-up">
                    <BarChart
                        title="Despesas Mensais"
                        categories={barData.categories}
                        data={barData.despesas}
                        height={400}
                        width="100%"
                    />
                </div>
                    <div className="chart-container animate-slide-up">
                    <BarChart
                        title="Freelance Mensal"
                        categories={freelanceImpostoBarData.categories}
                        data={freelanceImpostoBarData.freelance}
                        height={400}
                        width="100%"
                    />
                </div>
                    <div className="chart-container animate-slide-up">
                    <BarChart
                        title="Imposto Aproximado Mensal"
                        categories={freelanceImpostoBarData.categories}
                        data={freelanceImpostoBarData.imposto}
                        height={400}
                        width="100%"
                    />
                </div>
            </div>
                {/* Seção de resumos e estatísticas */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 animate-fade-in">
                        Resumo Financeiro
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
                        {extractLoading ? (
                            <div className="col-span-full flex justify-center">
                                <LoadingSpinner />
                            </div>
                        ) : extractTotals ? (
                            <>
                                <Card 
                                    title="Total Receitas" 
                                    value={extractTotals.total_receitas} 
                                    variant="success"
                                    trend="up"
                                />
                                <Card 
                                    title="Total Despesas" 
                                    value={extractTotals.total_despesas} 
                                    variant="danger"
                                    trend="down"
                                />
                                <Card 
                                    title="Total Investimentos" 
                                    value={extractTotals.total_investimentos} 
                                    variant="info"
                                />
                                <Card 
                                    title="Saldo Final" 
                                    value={extractTotals.saldo_final} 
                                    variant={extractTotals.saldo_final?.includes('-') ? 'danger' : 'success'}
                                />
                            </>
                        ) : null}
                        {extractError && (
                            <div className="col-span-full text-center">
                                <p className="text-accent-600 dark:text-accent-400">{extractError}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {extractTotals && (
                            <>
                                <Card 
                                    title="Total Freelance" 
                                    value={extractTotals.total_freelance} 
                                    variant="warning"
                                />
                                <Card 
                                    title="Imposto Aproximado" 
                                    value={extractTotals.imposto_aproximado} 
                                    variant="danger"
                                />
                                <Card 
                                    title="Média Receitas" 
                                    value={extractTotals.media_receitas_por_periodo} 
                                    variant="success"
                                />
                                <Card 
                                    title="Média Despesas" 
                                    value={extractTotals.media_despesas_por_periodo} 
                                    variant="danger"
                                />
                            </>
                        )}
                    </div>
                </div>
                {/* Seção de maiores transações */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {/* Maiores Despesas */}
                    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                        <div className="flex items-center mb-6">
                            <div className="w-3 h-3 bg-accent-500 rounded-full mr-3"></div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Maiores Despesas</h3>
                        </div>
                        {extractLoading ? (
                            <div className="flex justify-center py-8">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {maioresDespesas.slice(0, 5).map((d, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words leading-relaxed">
                                                {d.descricao}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {d.data?.slice(0, 10)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-accent-600 dark:text-accent-400">
                                                {d.valor}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Maiores Receitas */}
                    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                        <div className="flex items-center mb-6">
                            <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Maiores Receitas</h3>
                        </div>
                        {extractLoading ? (
                            <div className="flex justify-center py-8">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {maioresReceitas.slice(0, 5).map((r, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-words leading-relaxed">
                                                {r.descricao}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {r.data?.slice(0, 10)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-success-600 dark:text-success-400">
                                                {r.valor}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Despesas Fixas */}
                <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                    <div className="flex items-center mb-6">
                        <FaRegCalendarCheck className="text-primary-500 mr-3" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Despesas Fixas</h3>
                    </div>
                    {fixedExpensesLoading ? (
                        <div className="flex justify-center py-8">
                            <LoadingSpinner />
                        </div>
                    ) : fixedExpensesError ? (
                        <p className="text-accent-600 dark:text-accent-400 text-center">{fixedExpensesError}</p>
                        ) : fixedExpenses.length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400 text-center">Nenhuma despesa fixa encontrada.</p>
                        ) : (
                        <div className="space-y-4">
                                {fixedExpenses.slice(0, 8).map((item, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">{item.descricao}</h4>
                                        <span className="text-lg font-bold text-accent-600 dark:text-accent-400">
                                            {Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                                        <span>Banco: <span className="font-medium text-slate-700 dark:text-slate-300">{item.banco}</span></span>
                                        <span>Meses: <span className="font-medium text-slate-700 dark:text-slate-300">{item.meses_distintos}</span></span>
                                        <span>Ocorrências: <span className="font-medium text-slate-700 dark:text-slate-300">{item.ocorrencias}</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>

                {/* Posições de Investimento */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 animate-fade-in">
                        Posições de Investimento
                    </h2>
                    <div className="glass-strong rounded-2xl p-6 animate-slide-up">
                    {investingLoading ? (
                            <div className="flex justify-center py-8">
                        <LoadingSpinner />
                            </div>
                    ) : currentPositions ? (
                        <InvestmentPositions positions={currentPositions} />
                    ) : null}
                </div>
            </div>

                {/* Resumo de Hábitos */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 animate-fade-in">
                        Resumo de Hábitos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {notionLoading ? (
                            <div className="col-span-full flex justify-center">
                                <LoadingSpinner />
                            </div>
                        ) : notionResume ? (
                            <>
                                <Card title="Total de Hábitos" value={notionResume.total_habits} variant="info" />
                                <Card title="Completos" value={notionResume.total_habits_completed} variant="success" />
                                <Card title="Não Completos" value={notionResume.total_habits_not_completed} variant="danger" />
                                <Card title="Progresso (%)" value={notionResume.total_habits_progress_percentage?.toFixed(2) + '%'} variant="info" />
                            </>
                        ) : null}
                        {notionError && (
                            <div className="col-span-full text-center">
                                <p className="text-accent-600 dark:text-accent-400">{notionError}</p>
                    </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mt-6">
                        {notionResume && (
                            <>
                                <Card title="Jiu Jitsu" value={notionResume.total_jiu_jitsu_progress} variant="success" />
                                <Card title="Muay Thai" value={notionResume.total_muay_thai_progress} variant="success" />
                                <Card title="Boxe" value={notionResume.total_boxe_progress} variant="success" />
                                <Card title="Natação" value={notionResume.total_natacao_progress} variant="success" />
                                <Card title="Corrida" value={notionResume.total_corrida_progress} variant="success" />
                                <Card title="Musculação" value={notionResume.total_musculacao_progress} variant="success" />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
