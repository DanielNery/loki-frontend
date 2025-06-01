import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarChartProps {
  title: string;
  categories: string[];
  data: number[];
}

export default function BarChart({ title, categories, data }: BarChartProps) {
  const series = [
    {
      name: 'Progresso',
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    title: {
      text: title,
      align: 'center',
      style: { color: '#2563eb' },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: { colors: '#D3D3D3' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#D3D3D3' },
      },
    },
    grid: { show: false },
    colors: ['#2563eb'],
    dataLabels: { enabled: true },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
} 