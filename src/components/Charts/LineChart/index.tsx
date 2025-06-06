import React from "react";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
  color?: string;
  title?: string;
  data: { date: string; value: number }[];
}

export default function LineChart({ color = '#007bff', title, data }: LineChartProps) {
  const series = [{
    name: 'Valor',
    data: data.map(item => item.value)
  }];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
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
    stroke: {
      curve: 'smooth',
      width: 3,
      lineCap: 'round'
    },
    colors: [color],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 3
      }
    },
    xaxis: {
      categories: data.map(item => item.date),
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
          return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
    tooltip: {
      y: {
        formatter: (value) => {
          return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
      },
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      x: {
        show: true,
        formatter: (value, { dataPointIndex }) => {
          return data[dataPointIndex].date;
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [color],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart 
        options={options} 
        series={series} 
        type="line" 
        height={350} 
      />
    </div>
  );
}