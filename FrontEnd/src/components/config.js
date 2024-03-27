// src/config/config.js

export const chartColors = {
    soldColorSet: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    incomeColorSet: [
      'rgba(132, 99, 255, 0.2)',
      'rgba(162, 235, 54, 0.2)',
      'rgba(206, 86, 255, 0.2)',
      'rgba(192, 75, 192, 0.2)',
      'rgba(102, 255, 153, 0.2)',
      'rgba(159, 64, 255, 0.2)',
    ],
  };
  
  export const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
      datalabels: {
        color: '#444',
        anchor: 'center',
        align: 'center',
        formatter: (value, context) => value > 0 ? context.chart.data.labels[context.dataIndex] : '',
      },
    },
  };
  