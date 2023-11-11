import React from "react";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface myColumnWithMarkersProps {
  title?: string
}

export default function ColumnWithMarkers({title}: myColumnWithMarkersProps){
    
    const series = [
        {
          name: 'Actual',
          data: [
            {
              x: '2011',
              y: 1292,
              goals: [
                {
                  name: 'Expected',
                  value: 1400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2012',
              y: 4432,
              goals: [
                {
                  name: 'Expected',
                  value: 5400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2013',
              y: 5423,
              goals: [
                {
                  name: 'Expected',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2014',
              y: 6653,
              goals: [
                {
                  name: 'Expected',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2015',
              y: 8133,
              goals: [
                {
                  name: 'Expected',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2016',
              y: 7132,
              goals: [
                {
                  name: 'Expected',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2017',
              y: 7332,
              goals: [
                {
                  name: 'Expected',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2018',
              y: 6553,
              goals: [
                {
                  name: 'Expected',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            }
          ]
        }
    ]
    
    const options: ApexOptions = {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#15c16b', '#FFD700']
          }
        },
        xaxis: {
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
        title: {
          text: title,
          floating: true,
          offsetY: 50,
          align: 'center',
          style: {
            color: '#D3D3D3'
          }
        },
        grid: {
            show: false // Oculta as grades do gráfico
        },
    }

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
}