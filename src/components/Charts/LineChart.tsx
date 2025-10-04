import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
    title: string;
    data: { date: string; value: number }[];
    color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ title, data, color = '#3b82f6' }) => {
    // Detecta se está no modo escuro
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    const options: ApexOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            background: 'transparent',
            fontFamily: 'Inter, system-ui, sans-serif'
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: '600',
                color: isDarkMode ? '#f1f5f9' : '#1e293b'
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            lineCap: 'round'
        },
        markers: {
            size: 6,
            strokeWidth: 2,
            strokeColors: [color],
            shape: 'circle',
            hover: {
                size: 8
            }
        },
        xaxis: {
            categories: data.map(item => item.date),
            labels: {
                style: {
                    colors: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: '12px',
                    fontWeight: '500'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: '12px',
                    fontWeight: '500'
                },
                formatter: (value) => {
                    return new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(value);
                }
            }
        },
        colors: [color],
        grid: {
            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            theme: isDarkMode ? 'dark' : 'light',
            style: {
                fontSize: '14px',
                fontFamily: 'Inter, system-ui, sans-serif'
            },
            y: {
                formatter: (value) => {
                    return new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(value);
                }
            }
        },
        legend: {
            show: false
        }
    };

    const series = [{
        name: title,
        data: data.map(item => item.value)
    }];

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={400}
        />
    );
};

export default LineChart; 