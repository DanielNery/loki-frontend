import React from "react";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


function generateDayWiseTimeSeries(baseval: number, count: number, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  
      series.push([x, y]);
      baseval += 86400000; // Adiciona 1 dia em milissegundos
      i++;
    }
    return series;
}

interface AreaStackedChartProps {
    title: string;
    series: { name: string; data: number[] }[];
    categories: string[];
}

export default function AreaStackedChart({ title, series, categories }: AreaStackedChartProps) {
    // Detecta se está no modo escuro
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    const options: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            background: 'transparent',
            fontFamily: 'Inter, system-ui, sans-serif',
            width: '100%',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        title: {
            text: title,
            floating: true,
            offsetY: 20,
            align: 'center',
            style: {
                color: isDarkMode ? '#f1f5f9' : '#1e293b',
                fontSize: '16px',
                fontWeight: 600
            }
        },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
                shadeIntensity: 1,
                stops: [0, 90, 100]
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 10,
            labels: {
                colors: isDarkMode ? '#94a3b8' : '#64748b'
            },
            itemMargin: {
                horizontal: 8,
                vertical: 4
            },
            fontSize: '11px',
            fontWeight: 500
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: '11px'
                },
                rotate: -45,
                rotateAlways: false,
                maxHeight: 60,
                trim: true
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
                    fontSize: '12px'
                },
                formatter: (value) => {
                    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
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
            y: {
                formatter: (value) => {
                    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
            },
            theme: isDarkMode ? 'dark' : 'light',
            style: {
                fontSize: '12px',
                fontFamily: 'Inter, system-ui, sans-serif'
            }
        },
        // @ts-ignore
        markers: {
            size: 6,
            strokeWidth: 2,
            strokeColors: ['#fff'],
            shape: 'circle',
            hover: {
                size: 8
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    height: 300
                },
                legend: {
                    fontSize: '10px',
                    offsetY: 5,
                    itemMargin: {
                        horizontal: 6,
                        vertical: 3
                    }
                },
                xaxis: {
                    labels: {
                        style: {
                            fontSize: '10px'
                        }
                    }
                }
            }
        }]
    };

    return (
        <div id="chart" className="w-full overflow-hidden">
            <ReactApexChart 
                options={options} 
                series={series} 
                type="area" 
                height={350}
                width="100%"
            />
        </div>
    );
}