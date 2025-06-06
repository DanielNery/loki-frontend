import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineChartProps {
    title: string;
    data: { date: string; value: number }[];
    color?: string;
}

const LineChart: React.FC<LineChartProps> = ({ title, data, color = '#007bff' }) => {
    const options: ApexOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            }
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        markers: {
            size: 12,
            strokeWidth: 0,
            shape: 'circle'
        },
        xaxis: {
            categories: data.map(item => item.date),
            labels: {
                style: {
                    colors: '#666'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#666'
                }
            }
        },
        colors: [color],
        grid: {
            borderColor: '#f1f1f1'
        }
    };

    const series = [{
        name: title,
        data: data.map(item => item.value)
    }];

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={400}
        />
    );
};

export default LineChart; 