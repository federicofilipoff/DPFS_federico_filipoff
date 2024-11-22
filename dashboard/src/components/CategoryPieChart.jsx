import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const CategoryPieChart = ({ categories }) => {
  const data = Object.entries(categories).map(([category, total], index) => ({
    id: index,
    value: total,
    label: category,
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Distribución de Categorías</h3>
      <PieChart
        series={[
          {
            data,
          },
        ]}
        width={700}
        height={300}
      />
    </div>
  );
};

export default CategoryPieChart;
