import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface HabitsDonutChartProps {
  title: string;
  categories: string[];
  data: number[];
}

export default function HabitsDonutChart({ title, categories, data }: HabitsDonutChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: categories,
    title: {
      text: title,
      align: 'center',
      style: { color: '#2563eb' },
    },
    legend: {
      position: 'bottom',
      labels: { colors: '#D3D3D3' },
    },
    dataLabels: {
      enabled: true,
      style: { colors: ['#fff'] },
    },
    colors: [
      '#2563eb', // Boxe
      '#fbbf24', // Corrida
      '#34d399', // Jiu Jitsu
      '#a78bfa', // Muay Thai
      '#f59e42', // Musculação
      '#f472b6', // Música
      '#10b981', // Natação
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#fff',
              fontSize: '24px',
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toString(),
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={data} type="donut" height={350} />
    </div>
  );
} 