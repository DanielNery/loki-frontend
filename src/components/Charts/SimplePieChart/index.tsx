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
    // Detecta se está no modo escuro
    const isDarkMode = document.documentElement.classList.contains('dark');
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
            color: isDarkMode ? '#f1f5f9' : '#1e293b',
            fontSize: '16px',
            fontWeight: 600
          }
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: 20,
          height: 140,
          labels: {
            colors: isDarkMode ? '#94a3b8' : '#64748b',
            useSeriesColors: false
          },
          markers: {
            strokeWidth: 0,
            offsetX: 0,
            offsetY: 0
          },
          itemMargin: {
            horizontal: 16,
            vertical: 10
          },
          fontSize: '13px',
          fontWeight: 500
        },
        dataLabels: {
          enabled: false
        },
        colors: [
          '#10b981', // Verde esmeralda
          '#06b6d4', // Ciano
          '#f59e0b', // Âmbar
          '#3b82f6', // Azul
          '#ef4444', // Vermelho
          '#8b5cf6', // Roxo
          '#f97316', // Laranja
          '#84cc16', // Lima
          '#ec4899', // Rosa
          '#6366f1'  // Índigo
        ],
        plotOptions: {
          pie: {
            donut: {
              size: '75%',
              background: 'transparent',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  offsetY: -15
                },
                value: {
                  show: true,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  offsetY: 8,
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
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
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
          theme: isDarkMode ? 'dark' : 'light',
          style: {
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif'
          },
          y: {
            formatter: (val: number) => formatValue(val)
          },
          x: {
            formatter: (val: number, opts: any) => {
              if (opts && opts.w && opts.w.config && typeof opts.seriesIndex !== 'undefined') {
                const seriesIndex = opts.seriesIndex;
                const seriesValue = opts.w.config.series[seriesIndex];
                const percentage = ((seriesValue / opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
                return `${val} (${percentage}%)`;
              }
              return val.toString();
            }
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
          width: 2,
          lineCap: 'round',
          colors: [isDarkMode ? '#1e293b' : '#ffffff']
        }
      };

    return (
        <div id="chart" className="w-full">
            <ReactApexChart options={options} series={series} type="donut" height={height} width={width} />
        </div>
    );
}