import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface EmissionData {
  [key: string]: number | string;
}

interface LineConfig {
  key: string;
  name: string;
  color: string;
  isDashed?: boolean;
}

interface EmissionsTrendChartProps {
  fetchData: () => Promise<any>;
  initialScope?: string;  // 使初始範疇成為可選參數
}

export function EmissionsTrendChart({ fetchData, initialScope = 'scope1+scope2' }: EmissionsTrendChartProps) {
  const [data, setData] = useState<EmissionData[]>([])
  const [config, setConfig] = useState<any>(null)
  const [title, setTitle] = useState<string>("")
  const [selectedScope, setSelectedScope] = useState<string>(initialScope)

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData()
      setData(result.data)
      setConfig(result.config)
      setTitle(result.title)
    }
    loadData()
  }, [fetchData])

  if (!config) return null;

  const scopeOptions = [
    { value: 'scope1', label: 'Scope 1' },
    { value: 'scope2', label: 'Scope 2' },
    { value: 'scope1+scope2', label: 'Scope 1 + Scope 2' },
  ];

  const getLineData = (scope: string) => {
    return data.map(item => ({
      ...item,
      value: scope === 'scope1+scope2' 
        ? (item.scope1 as number) + (item.scope2 as number)
        : item[scope] as number
    }));
  };

  const chartData = getLineData(selectedScope);

  return (
    <Card className="col-span-2 overflow-hidden h-[400px] flex flex-col">
      <CardHeader className="p-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Select value={selectedScope} onValueChange={(value: string) => setSelectedScope(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="選擇範疇" />
          </SelectTrigger>
          <SelectContent>
            {scopeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-2 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name={scopeOptions.find(option => option.value === selectedScope)?.label} 
              stroke="#8884d8" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              name="目標值" 
              stroke="#FF0000" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}