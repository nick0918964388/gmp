'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { year: 2019, subsidiary: 392989, fab: 1678725, rate: 0.0043 },
  { year: 2020, subsidiary: 294, fab: 1710625, rate: 0.0033 },
  { year: 2021, subsidiary: 156252, fab: 1669771, rate: 0.0031 },
  { year: 2022, subsidiary: 156252, fab: 669773, rate: 0.0024 },
  { year: 2023, subsidiary: 122011, fab: 0, rate: 0.0003 },
  { year: 2024, subsidiary: 0, fab: 0, rate: 0 },
]

const formatTooltip = (value: number, name: string) => {
  if (name === 'rate') return value.toFixed(4)
  return value.toLocaleString()
}

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `${value / 1000000}M`
  if (value >= 1000) return `${value / 1000}K`
  return value
}

export function Scope1EmissionsChart() {
  return (
    <Card className="w-full max-w-[50vw] mx-auto bg-gray-50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">SCOPE1 溫室氣體排放量</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(label) => `年份: ${label}`}
                contentStyle={{ backgroundColor: 'white', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="subsidiary" 
                name="子公司" 
                fill="#ff7300" 
                barSize={20}
              />
              <Bar 
                yAxisId="left" 
                dataKey="fab" 
                name="晶圓廠" 
                fill="#8884d8" 
                barSize={20}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="rate" 
                name="溫室氣體排放強度" 
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 mt-4 text-center">
          單位：公噸二氧化碳當量/十二吋晶圓當量-光罩數
        </div>
      </CardContent>
    </Card>
  )
}