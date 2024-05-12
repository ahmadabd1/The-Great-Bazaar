import React, { useMemo } from "react";
import "../style/statics.css";
import { chartColors, chartOptions } from "../config";
import useGetStatistics from "../customHooks/useGetStatistics";
import Chart from "./Chart";
import Loading from "../Loading";
import Error from "../Error";
import NoData from "../NoData";

const createChartData = (data, dataKey, colorSet) => ({
  labels: data.map((item) => item.name),
  datasets: [
    {
      label: dataKey === "total_sold" ? "Total Sold" : "Total Income",
      data: data.map((item) => item[dataKey]),
      backgroundColor: colorSet,
      borderColor: colorSet.map((color) => color.replace("0.2", "1")),
      borderWidth: 1,
    },
  ],
});

const chartConfigs = [
  {
    dataKey: "total_sold",
    colorSet: "soldColorSet",
    title: "Total Sold Quantity",
  },
  {
    dataKey: "total_income",
    colorSet: "incomeColorSet",
    title: "Total Income",
  },
];

export default function Statics() {
  const { itemData, categoryData, monthlyIncomeData, loading, error } =
    useGetStatistics();

  const itemChartData = useMemo(
    () =>
      itemData?.filter((item) => item.total_sold > 0 || item.total_income > 0),
    [itemData],
  );
  const categoryChartData = useMemo(
    () =>
      categoryData?.filter(
        (category) => category.total_sold > 0 || category.total_income > 0,
      ),
    [categoryData],
  );

  const monthlyIncomeChartData = useMemo(() => {
    const data = monthlyIncomeData?.data;

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const sortedData = [...data].sort((a, b) => {
      return (
        new Date(a._id.year, a._id.month - 1) -
        new Date(b._id.year, b._id.month - 1)
      );
    });

    return {
      labels: sortedData.map((data) => `${data._id.month}/${data._id.year}`),
      datasets: [
        {
          label: "Monthly Income",
          data: sortedData.map((data) => data.totalIncome),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [monthlyIncomeData]); // Depend on monthlyIncomeData to trigger re-calculation

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (
    !itemChartData ||
    itemChartData.length === 0 ||
    !categoryChartData ||
    categoryChartData.length === 0
  )
    return <NoData />;

  return (
    <div className="statics-container">
      <h1 className="statics-title">Item Statistics</h1>
      {chartConfigs.map((config, index) => (
        <Chart
          key={`item-chart-${index}`}
          type="pie"
          data={createChartData(
            itemChartData,
            config.dataKey,
            chartColors[config.colorSet],
          )}
          options={chartOptions}
          title={`Item ${config.title}`}
        />
      ))}

      <h1 className="statics-title">Category Statistics</h1>
      {chartConfigs.map((config, index) => (
        <Chart
          key={`category-chart-${index}`}
          type="pie"
          data={createChartData(
            categoryChartData,
            config.dataKey,
            chartColors[config.colorSet],
          )}
          options={chartOptions}
          title={`Category ${config.title}`}
        />
      ))}

      {monthlyIncomeChartData && (
        <div>
          <h1 className="statics-title">Monthly Income</h1>
          <Chart
            type="line"
            data={monthlyIncomeChartData}
            options={chartOptions}
            title="Monthly Income"
          />
        </div>
      )}
    </div>
  );
}
