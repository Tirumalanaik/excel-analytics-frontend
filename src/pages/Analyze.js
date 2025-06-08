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
    const [chartTitle, setChartTitle] = useState('Data Analysis');

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

    const generateChartData = () => {
        if (!excelData.length) return null;

        const keys = Object.keys(excelData[0]);
        const labelKey = keys[0]; // Use first column as label (e.g., "Name", "Date", etc.)
        const valueKey = keys[1]; // Use second column as value (e.g., "Sales", "Marks", etc.)

        const labels = excelData.map(row => row[labelKey]);
        const values = excelData.map(row => Number(row[valueKey]));

        return {
            labels,
            datasets: [
                {
                    label: valueKey,
                    data: values,
                    backgroundColor: [
                        '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6',
                        '#8b5cf6', '#14b8a6', '#f97316', '#e11d48', '#22c55e'
                    ],
                },
            ],
        };
    };

    const chartData = generateChartData();

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

    return (
        <div className="analyze-container">
            <h2>{chartTitle}</h2>

            {chartData ? (
                <>
                    <div className="button-group">
                        <button onClick={() => setChartTitle('Bar Chart View')}>Bar Chart</button>
                        <button onClick={() => setChartTitle('Pie Chart View')}>Pie Chart</button>
                        <button onClick={() => setChartTitle('Line Chart View')}>Line Chart</button>
                        <button onClick={downloadAsImage}>Download PNG</button>
                        <button onClick={downloadAsPDF}>Download PDF</button>
                    </div>

                    <div id="chart-wrapper">
                        {chartTitle.includes('Bar') && <Bar data={chartData} />}
                        {chartTitle.includes('Pie') && <Pie data={chartData} />}
                        {chartTitle.includes('Line') && <Line data={chartData} />}
                    </div>
                </>
            ) : (
                <p>Loading or no data found...</p>
            )}
        </div>
    );
};

export default Analyze;
