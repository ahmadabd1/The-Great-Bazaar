import React from "react";
import "../style/statics.css";
import { chartColors, chartOptions } from "../config";
import useGet from "../customHooks/useGet";
import Chart from "./Chart";

const createChartData = (itemData, dataKey, colorSet) => ({
  labels: itemData.map((item) => item.name),
  datasets: [
    {
      label: dataKey === "total_sold" ? "Total Sold" : "Total Income",
      data: itemData.map((item) => item[dataKey]),
      backgroundColor: colorSet,
      borderColor: colorSet.map((color) => color.replace("0.2", "1")),
      borderWidth: 1,
    },
  ],
});

export default function Statics() {
  const {
    data: itemData,
    loading,
    error,
  } = useGet("http://localhost:8080/statics/item");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!itemData) return <div>No data</div>;

  const filteredData = itemData.filter(
    (item) => item.total_sold > 0 || item.total_income > 0,
  );

  const chartConfigs = [
    {
      type: "pie",
      dataKey: "total_sold",
      colorSet: chartColors.soldColorSet,
      title: "Total Sold Quantity",
    },
    {
      type: "pie",
      dataKey: "total_income",
      colorSet: chartColors.incomeColorSet,
      title: "Total Income",
    },
  ];

  return (
    <div className="statics-container">
      {/* <h1 className="statics-title">Item Statistics</h1> */}
      {chartConfigs.map((config, index) => (
        <Chart
          key={index}
          type={config.type}
          data={createChartData(filteredData, config.dataKey, config.colorSet)}
          options={chartOptions}
          title={config.title}
        />
      ))}
    </div>
  );
}
