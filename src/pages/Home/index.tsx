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
        <div>
            <Header />
            {/* Grid dinâmica de gráficos no topo, mantendo todos os gráficos já existentes */}
            <div className="grid md:grid-cols-2 gap-4 mt-5">
                {/* Gráfico de rosca de ativos */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
                    {currentPositions && Object.keys(currentPositions).length > 0 && (() => {
                        const ativos = Object.entries(currentPositions)
                            .map(([k, v]) => [k, parseFloat(String(v).replace(/[^0-9\,\.\-]/g, '').replace(',', '.'))] as [string, number])
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 10);
                        const labels = ativos.map(([k]) => k);
                        const series = ativos.map(([, v]) => v);
                        return (
                            <SimplePieChart
                                title="Participação dos Ativos"
                                labels={labels}
                                series={series}
                                height={500}
                                width={"100%"}
                                valueFormatter={val => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}
                            />
                        );
                    })()}
                </div>
                {/* Gráfico de linha de receitas */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução das Receitas"
                        color="#15c16b"
                        data={extractToSeries(extractResume, 'total_receitas')}
                    />
                </div>
                {/* Gráfico de barras de hábitos */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
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
                            height={500}
                            width="100%"
                        />
                    )}
                </div>
                {/* Gráfico de linha de despesas */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução das Despesas"
                        color="#FF4560"
                        data={extractToSeries(extractResume, 'total_despesas')}
                    />
                </div>
                {/* Gráfico de área de evolução geral */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <AreaStackedChart
                        title="Evolução Receitas, Despesas, Investimentos e Saldo"
                        series={getExtractAreaSeries(extractResume)}
                        categories={extractMonths(extractResume)}
                    />
                </div>
                {/* Gráfico de linha de saldo */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução do Saldo por Período"
                        color="#007bff"
                        data={extractToSeries(extractResume, 'saldo')}
                    />
                </div>
                {/* Gráfico de linha de investimentos */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução dos Investimentos"
                        color="#008FFB"
                        data={extractToSeries(extractResume, 'total_investimentos')}
                    />
                </div>
                {/* Gráfico de rosca de hábitos */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
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
                            height={500}
                            width="100%"
                        />
                    )}
                </div>
                {/* Gráfico de linha de freelance */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução do Freelance"
                        color="#FEB019"
                        data={extractToSeries(extractResume, 'total_freelance')}
                    />
                </div>
                {/* Gráfico de linha de imposto */}
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    <LineChart
                        title="Evolução do Imposto Aproximado"
                        color="#775DD0"
                        data={extractToSeries(extractResume, 'imposto_aproximado')}
                    />
                </div>
            </div>
            {/* Gráficos de colunas em grid de duas colunas */}
            <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
                    <BarChart
                        title="Receitas Mensais"
                        categories={barData.categories}
                        data={barData.receitas}
                        height={400}
                        width="100%"
                    />
                </div>
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
                    <BarChart
                        title="Despesas Mensais"
                        categories={barData.categories}
                        data={barData.despesas}
                        height={400}
                        width="100%"
                    />
                </div>
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
                    <BarChart
                        title="Freelance Mensal"
                        categories={freelanceImpostoBarData.categories}
                        data={freelanceImpostoBarData.freelance}
                        height={400}
                        width="100%"
                    />
                </div>
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50 w-full">
                    <BarChart
                        title="Imposto Aproximado Mensal"
                        categories={freelanceImpostoBarData.categories}
                        data={freelanceImpostoBarData.imposto}
                        height={400}
                        width="100%"
                    />
                </div>
            </div>
            {/* Cards e listas de totais/maiores receitas/despesas abaixo */}
            <div className="mt-5">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        {extractLoading ? <LoadingSpinner /> : extractTotals && (
                            <>
                                <Card title="Total Receitas" value={extractTotals.total_receitas} />
                                <Card title="Total Despesas" value={extractTotals.total_despesas} />
                                <Card title="Total Investimentos" value={extractTotals.total_investimentos} />
                                <Card title="Total Freelance" value={extractTotals.total_freelance} />
                                <Card title="Imposto Aproximado" value={extractTotals.imposto_aproximado} />
                                <Card title="Saldo Final" value={extractTotals.saldo_final} />
                                <Card title="Média Receitas" value={extractTotals.media_receitas_por_periodo} />
                                <Card title="Média Despesas" value={extractTotals.media_despesas_por_periodo} />
                            </>
                        )}
                        {extractError && <p className="text-red-500">{extractError}</p>}
                    </div>
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        <h3 className="font-bold mb-2 text-red-400">Maiores Despesas</h3>
                        {extractLoading ? <LoadingSpinner /> : (
                            <div>
                                {maioresDespesas.slice(0, 5).map((d, i) => (
                                    <Card
                                        key={i}
                                        title={`${d.data?.slice(0, 10)} - ${d.descricao}`}
                                        value={<span className="text-red-400 font-bold">{d.valor}</span>}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        <h3 className="font-bold mb-2 text-green-400">Maiores Receitas</h3>
                        {extractLoading ? <LoadingSpinner /> : (
                            <div>
                                {maioresReceitas.slice(0, 5).map((r, i) => (
                                    <Card
                                        key={i}
                                        title={`${r.data?.slice(0, 10)} - ${r.descricao}`}
                                        value={<span className="text-green-400 font-bold">{r.valor}</span>}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        <h3 className="font-bold mb-4 text-blue-400 flex items-center gap-2 text-lg">
                            <FaRegCalendarCheck className="text-blue-400" /> Despesas Fixas
                        </h3>
                        {fixedExpensesLoading ? <LoadingSpinner /> : fixedExpensesError ? (
                            <p className="text-red-500">{fixedExpensesError}</p>
                        ) : fixedExpenses.length === 0 ? (
                            <p>Nenhuma despesa fixa encontrada.</p>
                        ) : (
                            <ul className="divide-y divide-slate-800">
                                {fixedExpenses.slice(0, 8).map((item, idx) => (
                                    <li key={idx} className="py-3 flex flex-col gap-1">
                                        <span className="font-bold text-base text-slate-200">{item.descricao}</span>
                                        <span className="text-xs text-slate-400">Banco: <span className="font-semibold text-slate-300">{item.banco}</span></span>
                                        <span className="text-xs text-slate-400">Meses: <span className="font-semibold text-slate-300">{item.meses_distintos}</span> | Ocorrências: <span className="font-semibold text-slate-300">{item.ocorrencias}</span></span>
                                        <span className="text-lg font-bold text-red-400 mt-1">{Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Add the new InvestmentPositions component */}
            <div className="mt-5">
                <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                    {investingLoading ? (
                        <LoadingSpinner />
                    ) : currentPositions ? (
                        <InvestmentPositions positions={currentPositions} />
                    ) : null}
                </div>
            </div>

            {/* Habit Tracker - Notion */}
            <div className="mt-5">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        {notionLoading ? <LoadingSpinner /> : notionResume && (
                            <>
                                <Card title="Total de Hábitos" value={notionResume.total_habits} />
                                <Card title="Completos" value={notionResume.total_habits_completed} />
                                <Card title="Não Completos" value={notionResume.total_habits_not_completed} />
                                <Card title="Progresso (%)" value={notionResume.total_habits_progress_percentage?.toFixed(2) + '%'} />
                            </>
                        )}
                        {notionError && <p className="text-red-500">{notionError}</p>}
                    </div>
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        {notionLoading ? <LoadingSpinner /> : notionResume && (
                            <>
                                <Card title="Jiu Jitsu" value={notionResume.total_jiu_jitsu_progress} />
                                <Card title="Muay Thai" value={notionResume.total_muay_thai_progress} />
                                <Card title="Boxe" value={notionResume.total_boxe_progress} />
                                <Card title="Natação" value={notionResume.total_natacao_progress} />
                                <Card title="Corrida" value={notionResume.total_corrida_progress} />
                            </>
                        )}
                    </div>
                    <div className="p-5 rounded-lg bg-white dark:bg-slate-950 dark:bg-opacity-50">
                        {notionLoading ? <LoadingSpinner /> : notionResume && (
                            <>
                                <Card title="Musculação" value={notionResume.total_musculacao_progress} />
                                <Card title="Música" value={notionResume.total_musica_progress} />
                                <Card title="Creatina" value={notionResume.total_creatina_progress} />
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
