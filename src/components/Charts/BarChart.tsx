import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarChartProps {
  title: string;
  categories: string[];
  data: number[];
  height?: number;
  width?: string | number;
}

export default function BarChart({ title, categories, data, height = 350, width = '100%' }: BarChartProps) {
  const series = [
    {
      name: 'Progresso',
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: height,
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
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        distributed: true,
        dataLabels: {
          position: 'top'
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
          return `${value}`;
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
    colors: [
      '#15c16b', // Verde
      '#00E396', // Verde claro
      '#FFD700', // Amarelo
      '#008FFB', // Azul
      '#FEB019', // Laranja
      '#FF4560', // Vermelho
      '#775DD0'  // Roxo
    ],
    dataLabels: {
      enabled: true,
      formatter: (val) => {
        return `${val}`;
      },
      style: {
        colors: ['#D3D3D3'],
        fontSize: '12px',
        fontWeight: 500
      },
      offsetY: -20
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: (value) => {
          return `${value}`;
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.8
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.8
        }
      }
    }
  };

  return (
    <div id="chart" className="w-full">
      <ReactApexChart 
        options={options} 
        series={series} 
        type="bar" 
        height={height} 
        width={width}
      />
    </div>
  );
} 