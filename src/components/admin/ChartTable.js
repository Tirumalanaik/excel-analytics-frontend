import React from 'react';
import '../../style/ChartTable.css';

const ChartTable = ({ charts }) => {
    return (
        <div className="admin-table-container">
            <h3 className="admin-table-title">Charts</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Chart ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {charts?.length > 0 ? (
                        charts.map((chart) => (
                            <tr key={chart._id}>
                                <td>{chart._id}</td>
                                <td>{chart.chartTitle || 'Untitled'}</td>
                                <td>{chart.chartType || 'N/A'}</td>
                                <td>{new Date(chart.createdAt).toLocaleString()}</td>
                                <td>{chart.userId?.email || 'Unknown'}</td>
                                <td>
                                    <a href={`/view-chart/${chart._id}`} className="view-link">
                                        View Chart
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No charts found</td>
                        </tr>
                    )}
                </tbody>



            </table>
        </div>
    );
};

export default ChartTable;
