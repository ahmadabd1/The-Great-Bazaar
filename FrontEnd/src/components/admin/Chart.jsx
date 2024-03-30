import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../style/chart.css'; // Ensure this path is correct

// Dynamically register chart components based on the chart type
const chartComponents = {
  pie: Pie,
  bar: Bar,
  line: Line,
};

const Chart = ({ type, data, options, title }) => {
  const ChartComponent = chartComponents[type];

  if (!ChartComponent) {
    console.error(`Chart type ${type} is not supported.`);
    return <p>Chart type {type} is not supported.</p>;
  }

  // Optional: Enhance options with common settings or overrides
  const mergedOptions = {
    ...options,
    plugins: { title: { display: true, text: title }, ...options.plugins },
  };

  return (
    <div className="chart-container">
      <h2 className='title-of-chart'>{title}</h2>
      <ChartComponent data={data} options={mergedOptions} />
    </div>
  );
};

// Registering the necessary Chart.js components
// Consider moving this to a more central place if used across multiple components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartDataLabels
);

export default Chart;
