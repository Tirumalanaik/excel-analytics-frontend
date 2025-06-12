import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/admin/AdminDasboard';
import {
    fetchUsers,
    fetchCharts,
    fetchUploads,
    fetchStats
} from '../services/adminapi';
import '../style/Adminpanel.css';

const Adminpanel = () => {
    const [users, setUsers] = useState([]);
    const [charts, setCharts] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const [usersRes, chartsRes, uploadsRes, statsRes] = await Promise.all([
                    fetchUsers(),
                    fetchCharts(),
                    fetchUploads(),
                    fetchStats()
                ]);
                setUsers(usersRes.data);
                setCharts(chartsRes.data);
                setUploads(uploadsRes.data);
                setStats(statsRes.data);
            } catch (err) {
                console.error('Admin fetch error:', err);
            }
        };
        getData();
    }, []);

    return (
        <AdminDashboard
            users={users}
            charts={charts}
            files={uploads}
            stats={stats}
        />
    );
};

export default Adminpanel;
