import React from "react";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface mySimplePieChartProps {
    title: string
}


export default function SimplePieChart({title}: mySimplePieChartProps){
    const series = [44, 55, 13, 43, 22]

    const options: ApexOptions = {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

    return (
        
        <div id="chart">
            <ReactApexChart options={options} series={series} type="pie" height={340} />
        </div>
        
    );
}