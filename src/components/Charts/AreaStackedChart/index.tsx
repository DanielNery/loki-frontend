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
    const options: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
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
                color: '#D3D3D3',
                fontSize: '16px',
                fontWeight: 500
            }
        },
        colors: ['#15c16b', '#00E396', '#FFD700', '#008FFB'],
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
            position: 'top',
            horizontalAlign: 'left',
            offsetY: -10,
            labels: {
                colors: '#D3D3D3'
            },
            markers: {
                strokeWidth: 0,
                strokeColor: '#fff',
                radius: 12
            },
            itemMargin: {
                horizontal: 10
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#D3D3D3',
                    fontSize: '12px'
                },
                rotate: -45,
                rotateAlways: false
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
                    colors: '#D3D3D3',
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
            borderColor: 'rgba(255, 255, 255, 0.1)',
            strokeDashArray: 4,
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
            theme: 'dark',
            style: {
                fontSize: '12px'
            }
        },
        markers: {
            size: 0,
            hover: {
                size: 5
            }
        }
    };

    return (
        <div id="chart">
            <ReactApexChart 
                options={options} 
                series={series} 
                type="area" 
                height={350} 
            />
        </div>
    );
}