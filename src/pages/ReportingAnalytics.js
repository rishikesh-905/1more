import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import '../styles/Reporting.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ReportingAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    totalOrders: 0,
    totalQuantity: 0,
    statusCounts: {},
    recentOrders: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders');
        const orders = response.data;

        const statusCounts = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        const totalQuantity = orders.reduce((acc, order) => acc + order.quantity, 0);
        const recentOrders = orders.slice(0, 5);

        setOrders(orders);
        setOrderSummary({
          totalOrders: orders.length,
          totalQuantity,
          statusCounts,
          recentOrders,
        });
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const pieData = {
    labels: Object.keys(orderSummary.statusCounts),
    datasets: [
      {
        label: 'Orders',
        data: Object.values(orderSummary.statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="reporting-analytics">
      <h2>Reporting and Analytics</h2>
      <p>Analyze inventory performance and trends with comprehensive reporting and analytics tools.</p>

      <div className="summary-section">
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Orders</h3>
            <p>{orderSummary.totalOrders}</p>
          </div>
          <div className="summary-card">
            <h3>Total Quantity</h3>
            <p>{orderSummary.totalQuantity}</p>
          </div>
          <div className="summary-card">
            <h3>Status Breakdown</h3>
            <ul>
              {Object.entries(orderSummary.statusCounts).map(([status, count]) => (
                <li key={status}>{status}: {count}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="chart-container">
          <h3>Order Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <h3>Recent Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderSummary.recentOrders.map(order => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Order Status Details</h3>
      <div className="status-details">
        {Object.entries(orderSummary.statusCounts).map(([status, count]) => (
          <div key={status} className="status-card">
            <h4>{status}</h4>
            <p>{count} Orders</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportingAnalytics;
