import React from "react";
//i have a formatCurrency() in utils foder which convert number currency into string currency.that is imported here
import { formatCurrency } from "../utils/Expense";
//recharts is a popular charting library for  react
//npm install recharts
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
//Object.entries(obj) in built method in js, Object ke key-value pairs ko array of arrays me convert karta hai
//data is in obj form -->Object.entries(data) array of arrays form --> every obj convert into new entry
//[name, value] → array destructuring
//Map ka purpose-Recharts ke liye object format banana
const ExpenseBarChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse();

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No expense data to display
      </div>
    );
  }
//toolip is a popup in recharts- after hovering on bar or point it shows
//CustomTooltip → fully customizable hover popup
//active → mouse status- currently mouse is hovering on bar or not
//payload[0].value →it show bar value { name: "food", value: 500 }
//label → it shows category name


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{label}</p>
          <p className="text-lg">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };
//ResponsiveContainer- its bult-in component in recharrts, This automatically scales the chart according to the parent width. 
//Data → chartData
//Responsive container → screen size ke hisaab se chart adjust
//CartesianGrid → dotted horizontal lines
//XAxis → tilted category labels
//YAxis → ₹ formatted values
//Tooltip → custom hover popup
//Bar → actual expense bars with animation and rounded top corners
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => `₹${value}`}
          tick={{
            fontSize: 12,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="amount"
          fill="#9b87f5"
          radius={[4, 4, 0, 0]}
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
