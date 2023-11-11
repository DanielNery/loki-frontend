import React from "react";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface myLineChartProps {
  color?: string,
  title?: string
}


export default function LineChart({color, title}: myLineChartProps) {

    const series = [{
        name: 'Série 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }];
    
    const options: ApexOptions = {
        chart: {
          type: 'line',
          height: 350,
        },
        title: {
          text: title,
          floating: true,
          offsetY: 50,
          align: 'center',
          style: {
            color: '#D3D3D3'
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
        colors: [color]
        // Outras opções de configuração podem ser adicionadas aqui
    };  

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
    );
}