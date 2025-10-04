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
  // Detecta se está no modo escuro
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const series = [
    {
      name: 'Valor',
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
      background: 'transparent',
      fontFamily: 'Inter, system-ui, sans-serif',
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
        columnWidth: '70%',
        distributed: false,
        dataLabels: {
          position: 'top'
        }
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        color: isDarkMode ? '#f1f5f9' : '#1e293b',
        fontSize: '18px',
        fontWeight: '600'
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: isDarkMode ? '#94a3b8' : '#64748b',
          fontSize: '12px',
          fontWeight: '500'
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
    colors: ['#22c55e'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(val);
      },
      style: {
        colors: [isDarkMode ? '#94a3b8' : '#64748b'],
        fontSize: '11px',
        fontWeight: '600'
      },
      offsetY: -20
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
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.1
        }
      },
      active: {
        filter: {
          type: 'lighten',
          value: 0.1
        }
      }
    },
    legend: {
      show: false
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