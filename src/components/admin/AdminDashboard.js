import React from 'react';
import FileTable from './FileTable';
import ChartTable from './ChartTable';
import StatsCard from './StatsCard';
import UserTable from './UserTable';

const AdminDashboard = ({ users, files, charts, stats }) => {
    return (
        <div className="admin-panel-container">
            <h2>Admin Dashboard</h2>
            <StatsCard stats={stats} />
            <UserTable users={users} />
            <FileTable files={files} />
            <ChartTable charts={charts} />
        </div>
    );
};

export default AdminDashboard;
