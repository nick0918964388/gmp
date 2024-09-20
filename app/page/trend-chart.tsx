'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TrendChartProps {
  data: {
    year: number;
    target: number;
    actual: number;
  }[];
  title: string;
}

export function TrendChart({ data, title }: TrendChartProps) {
  return (
    <div className="w-full h-[300px]">
      <h3 className="text-lg font-semibold mb-4 text-center">{title} - 10年趨勢</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="target" stroke="#8884d8" name="目標值" />
          <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="實際值" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}