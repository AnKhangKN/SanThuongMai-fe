import { Tooltip } from "antd";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComponent = () => {
  const data = [
    {
      name: "Thứ 2",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Thứ 3",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Thứ 4",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Thứ 5",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Thứ 6",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Thứ 7",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Chủ nhật",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
