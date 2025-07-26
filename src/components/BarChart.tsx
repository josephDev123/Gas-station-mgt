import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IBarCharProps {
  data: Record<PropertyKey, string | number>[];
  width?: number;
  height?: number;
}

export default function BarChar({
  data,
  height = 250,
  width = 500,
}: IBarCharProps) {
  if (!data.length) return <div>No data available</div>;

  const keys = Object.keys(data[0]);
  const xAxisKey = keys[0]; // assume the first key is for XAxis
  const barKeys = keys[1]; // assume the rest are bar values
  console.log(keys);

  return (
    <div className="w-full h-full overflow-x-auto">
      <BarChart
        width={width}
        height={height}
        data={data}
        barSize={30}
        barGap={0}
        barCategoryGap={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip label={"sale"} />
        <Legend />

        <Bar dataKey={barKeys} fill="82ca9d" />
      </BarChart>
    </div>
  );
}

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
