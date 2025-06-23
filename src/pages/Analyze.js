import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../style/Analyze.css';

Chart.register(...registerables);

const Analyze = () => {
    const { id } = useParams();
    const location = useLocation();
    const [excelData, setExcelData] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const [chartTitle, setChartTitle] = useState('Excel Data Analysis');
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    const [selectedXColumn, setSelectedXColumn] = useState('');
    const [selectedYColumn, setSelectedYColumn] = useState('');
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location.state?.data) {
                    setExcelData(location.state.data);
                } else if (id) {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://localhost:5000/api/upload/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setExcelData(res.data.data);
                }
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        fetchData();
    }, [location.state, id]);

    const handleSummarize = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:5000/api/ai/summarize`,
                { data: excelData },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSummary(res.data.summary);
        } catch (err) {
            console.error("Error fetching summary:", err);
        }
    };

    const generateChartData = () => {
        if (!excelData.length || !selectedXColumn || !selectedYColumn) return null;

        const labels = excelData.map(row => row[selectedXColumn]);
        const values = excelData.map(row => Number(row[selectedYColumn]));

        return {
            labels,
            datasets: [
                {
                    label: selectedYColumn,
                    data: values,
                    backgroundColor: '#3b82f6',
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: chartTitle,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xAxisLabel,
                },
            },
            y: {
                title: {
                    display: true,
                    text: yAxisLabel,
                },
            },
        },
    };

    const downloadAsImage = async () => {
        const chartDiv = document.getElementById('chart-wrapper');
        const canvas = await html2canvas(chartDiv);
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const downloadAsPDF = async () => {
        const chartDiv = document.getElementById('chart-wrapper');
        const canvas = await html2canvas(chartDiv);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
        pdf.save('chart.pdf');
    };

    const handleSaveChart = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/upload/chart/${id}`,
                {
                    chartData: generateChartData(),
                    chartType,
                    chartTitle,
                    axisLabels: { x: xAxisLabel, y: yAxisLabel },
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert('✅ Chart saved!');
        } catch (err) {
            console.error('❌ Save chart failed:', err);
            alert('Failed to save chart.');
        }
    };

    const chartData = generateChartData();
    const columns = excelData.length ? Object.keys(excelData[0]) : [];

    return (
        <div className="analyze-container">
            <h2>{chartTitle}</h2>
            <div className="input-group">
                <label>Chart Title:</label>
                <input value={chartTitle} onChange={(e) => setChartTitle(e.target.value)} />

                <label>X Axis:</label>
                <select value={selectedXColumn} onChange={(e) => setSelectedXColumn(e.target.value)}>
                    <option value="">Select column</option>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>

                <label>Y Axis:</label>
                <select value={selectedYColumn} onChange={(e) => setSelectedYColumn(e.target.value)}>
                    <option value="">Select column</option>
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>

                <label>Chart Type:</label>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                </select>

                <label>X Axis Label:</label>
                <input value={xAxisLabel} onChange={(e) => setXAxisLabel(e.target.value)} />

                <label>Y Axis Label:</label>
                <input value={yAxisLabel} onChange={(e) => setYAxisLabel(e.target.value)} />

               
                <button onClick={downloadAsImage}>Download PNG</button>
                <button onClick={downloadAsPDF}>Download PDF</button>
                <button onClick={handleSaveChart}>Save Chart</button>
            </div>

            <div id="chart-wrapper">
                {chartType === 'bar' && chartData && <Bar data={chartData} options={chartOptions} />}
                {chartType === 'line' && chartData && <Line data={chartData} options={chartOptions} />}
                {chartType === 'pie' && chartData && <Pie data={chartData} />}
            </div>

            {summary && (
                <div className="summary-box">
                    <h3>📊 AI Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default Analyze;
