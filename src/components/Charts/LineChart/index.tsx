import React from "react";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
  color?: string;
  title?: string;
  data: { date: string; value: number }[];
}

export default function LineChart({ color, title, data }: LineChartProps) {
  const series = [{
    name: 'Série 1',
    data: data.map(item => item.value)
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
      categories: data.map(item => item.date),
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