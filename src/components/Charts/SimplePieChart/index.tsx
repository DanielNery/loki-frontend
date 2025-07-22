import React from "react";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface mySimplePieChartProps {
    title: string;
    labels: string[];
    series: number[];
    height?: number;
    width?: string | number;
    valueFormatter?: (val: number) => string;
}

export default function SimplePieChart({title, labels, series, height = 350, width = '100%', valueFormatter}: mySimplePieChartProps){
    const formatValue = valueFormatter || ((val: number) => val.toString());
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
        labels: labels,
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
          markers: {
            strokeWidth: 0,
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
          // @ts-ignore
          formatter: function(val: string, opts: any) {
            if (opts && opts.w && opts.w.config && typeof opts.seriesIndex !== 'undefined' && opts.w.config.series) {
              return formatValue(opts.w.config.series[opts.seriesIndex]);
            }
            if (typeof val === 'number') return formatValue(val);
            return '';
          },
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
                  // @ts-ignore
                  formatter: function(val: string, opts: any) {
                    if (opts && opts.w && opts.w.config && typeof opts.seriesIndex !== 'undefined' && opts.w.config.series) {
                      return formatValue(opts.w.config.series[opts.seriesIndex]);
                    }
                    if (typeof val === 'number') return formatValue(val);
                    return '';
                  }
                },
                total: {
                  show: true,
                  label: 'Total',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#D3D3D3',
                  formatter: (w: any) => {
                    const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                    return formatValue(total);
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
            <ReactApexChart options={options} series={series} type="donut" height={height} width={width} />
        </div>
    );
}