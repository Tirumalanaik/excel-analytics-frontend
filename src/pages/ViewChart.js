import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Line, Bar, Pie } from 'react-chartjs-2';

const ViewChart = () => {
    const { id } = useParams();
    const [chartInfo, setChartInfo] = useState(null);

    useEffect(() => {
        const fetchChart = async () => {
            try {
                const res = await axios.get(`/api/upload/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setChartInfo(res.data);  // ✅ This was missing
            } catch (err) {
                console.error('Error loading chart', err);
            }
        };
        fetchChart();
    }, [id]);

    const renderChart = () => {
        if (!chartInfo || !chartInfo.chartData || !chartInfo.chartData.datasets) {
            return <p>Chart data not available</p>;
        }

        const data = {
            labels: chartInfo.chartData.labels,
            datasets: chartInfo.chartData.datasets.map(dataset => ({
                ...dataset,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: chartInfo.trendLine?.enabled ? 0.4 : 0,
            }))
        };

        const options = {
            plugins: {
                title: {
                    display: true,
                    text: chartInfo.chartTitle,
                },
            },
            scales: {
                x: { title: { display: true, text: chartInfo.axisLabels?.x || 'X Axis' } },
                y: { title: { display: true, text: chartInfo.axisLabels?.y || 'Y Axis' } },
            },
        };

        switch (chartInfo.chartType) {
            case 'bar':
                return <Bar data={data} options={options} />;
            case 'line':
                return <Line data={data} options={options} />;
            case 'pie':
                return <Pie data={data} options={options} />;
            default:
                return <p>Unsupported chart type</p>;
        }
    };

    return (
        <div className="view-chart-container">
            <h2>Chart Preview</h2>
            {renderChart()}
        </div>
    );
};

export default ViewChart;
