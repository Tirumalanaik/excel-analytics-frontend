
import React, { useEffect, useState } from 'react';
import { fetchStats } from '../../services/adminapi';

const StatsCard = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const getStats = async () => {
            const res = await fetchStats();
            setStats(res.data);
        };
        getStats();
    }, []);

    return (
        <div className="stats-container">
            <div className="stat-card">Users: {stats.totalUsers || 0}</div>
            <div className="stat-card">Files: {stats.totalFiles || 0}</div>
            <div className="stat-card">Charts: {stats.totalCharts || 0}</div>
        </div>
    );
};

export default StatsCard;
