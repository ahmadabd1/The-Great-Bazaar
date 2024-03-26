// src/components/Chart.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2'; // Import other chart types as needed
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the components and plugins you need
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels);

const chartComponents = {
  pie: Pie,
  bar: Bar,
  line: Line,
  // Add other chart types here
};

const Chart = ({ type, data, options, title }) => {
  const ChartComponent = chartComponents[type];

  if (!ChartComponent) {
    return <p>Chart type {type} not supported.</p>;
  }

  return (
    <div className="chart-container">
      <h2>{title}</h2>
      <ChartComponent data={data} options={{ ...options, title: { text: title } }} />
    </div>
  );
};

export default Chart;
