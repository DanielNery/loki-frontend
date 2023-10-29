import React from "react";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface myColumnWithDataLabelsChart {
  title: string;
}

export default function ColumnWithDataLabelsChart({title}: myColumnWithDataLabelsChart) {

    const series = [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }]

    const options: ApexOptions = {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          position: 'top',
          labels: {
            style: {
              colors: '#ffffff', // Define a cor do texto do eixo X para branco
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            style: {
                colors: '#ffffff', // Define a cor do texto do eixo X para branco
            },
            formatter: function (val) {
              return val + "%";
            }
          }
        
        },
        title: {
          text: title,
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#fff'
          }
        },
        grid: {
            show: false // Oculta as grades do gráfico
        },
        colors: ['#15c16b']
    }

    return (
        
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
        
    );
}