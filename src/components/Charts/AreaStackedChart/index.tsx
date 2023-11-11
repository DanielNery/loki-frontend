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

interface myAreaStackedChartProps {
    title: string
}

export default function AreaStackedChart({title}: myAreaStackedChartProps) {
    
    

    const series = [
        {
        name: 'Renda',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
        },
        {
        name: 'Investimentos',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 20
        })
        },
        {
        name: 'Despesas',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 15
        })
        }
    ]

    const options: ApexOptions = {
        chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
            selection: function (chart, e) {
            console.log(new Date(e.xaxis.min))
            }
        },
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
            type: 'datetime',
            labels: {
                style: {
                  colors: '#D3D3D3', // Define a cor do texto do eixo X para branco
                }
            }
        },
        yaxis: {
        labels: {
            style: {
            colors: '#D3D3D3', // Define a cor do texto do eixo Y para branco
            }
        }
        },
        grid: {
        show: false // Oculta as grades do gráfico
        },
    }
    



    return (
        
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
        
    );

}