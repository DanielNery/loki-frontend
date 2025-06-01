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
        },
        title: {
            text: title,
            floating: true,
            offsetY: 20,
            align: 'center',
            style: {
                color: '#D3D3D3'
            }
        },
        colors: ['#15c16b', '#00E396', '#FFD700'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#D3D3D3',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#D3D3D3',
                }
            }
        },
        grid: {
            show: false
        },
    };
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
}