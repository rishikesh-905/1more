import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
//import '../styles/InventoryChart.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const InventoryChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Prepare data for the chart
    const updatedChartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Quantity',
          data: data.map((item) => item.quantity),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    };

    setChartData(updatedChartData);
  }, [data]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `Product: ${context[0].label}`;
          },
          label: function (context) {
            return `Quantity: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Products',
          font: {
            size: 16,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="inventory-chart">
      <h2>Inventory Quantities</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default InventoryChart;
