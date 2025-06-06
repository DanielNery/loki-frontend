import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface HabitsDonutChartProps {
  title: string;
  categories: string[];
  data: number[];
  height?: number;
  width?: string | number;
}

export default function HabitsDonutChart({ title, categories, data, height = 350, width = '100%' }: HabitsDonutChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
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
    labels: categories,
    title: {
      text: title,
      floating: true,
      offsetY: 20,
      align: 'center',
      style: {
        color: '#D3D3D3',
        fontSize: '15px',
        fontWeight: 500
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 0,
      height: 100,
      labels: {
        colors: '#D3D3D3',
        useSeriesColors: false
      },
      // @ts-ignore
      markers: {
        strokeWidth: 0,
        radius: 12,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseFloat(val).toFixed(0)}`,
      style: {
        colors: ['#fff'],
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif'
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 3,
        left: -2,
        top: 2
      },
      background: {
        enabled: false
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
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              fontWeight: 600,
              color: '#D3D3D3',
              offsetY: -8
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 700,
              color: '#D3D3D3',
              offsetY: 2,
              formatter: (val: string) => `${parseFloat(val).toFixed(0)}`
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '13px',
              fontWeight: 600,
              color: '#D3D3D3',
              formatter: (w: any) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return `${total}`;
              }
            }
          }
        }
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: (val: number) => `${val}`
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.9
        }
      }
    },
    stroke: {
      width: 0,
      lineCap: 'round'
    }
  };

  return (
    <div id="chart" className="w-full">
      <ReactApexChart 
        options={options} 
        series={data} 
        type="donut" 
        height={height} 
        width={width}
      />
    </div>
  );
} 