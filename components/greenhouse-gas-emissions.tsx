'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import { ChevronRight, Search } from "lucide-react"

// 表格數據
const tableData = [
  { 
    year: 2023, 
    totalTarget: 310.00, totalActual: 309.73,
    toolTarget: 250.00, toolActual: 249.80,
    facTarget: 60.00, facActual: 59.93
  },
]

// 排放趨勢數據
const emissionsData = [
  { year: 2020, scope1: 50, scope2: 20, total: 70, target: 70, actual: 60 },
  { year: 2021, scope1: 55, scope2: 23, total: 78, target: 78, actual: 70 },
  { year: 2022, scope1: 70, scope2: 27, total: 97, target: 97, actual: 25 },
  { year: 2023, scope1: 72, scope2: 29, total: 101, target: 101, actual: 102 },
  { year: 2024, scope1: 90, scope2: 34, total: 124, target: 124, actual: null },
  { year: 2025, scope1: 200, scope2: 55, total: 255, target: 255, actual: null },
  { year: 2026, scope1: 250, scope2: 73, total: 323, target: 323, actual: null },
  { year: 2027, scope1: 270, scope2: 75, total: 345, target: 345, actual: null },
  { year: 2028, scope1: 330, scope2: 93, total: 423, target: 423, actual: null },
  { year: 2029, scope1: 400, scope2: 112, total: 512, target: 512, actual: null },
  { year: 2030, scope1: 520, scope2: 142, total: 662, target: 662, actual: null },
]

const facilityData = [
  { facility: '全公司', status: 'green' , type:'全公司' },
  { facility: 'Tool', status: 'green' , type:'全公司' },
  { facility: 'FAC', status: 'green' , type:'全公司' },
  { facility: 'F12A', status: 'green', type:'竹科' },
  { facility: 'F12B', status: 'red', type:'竹科' },
  { facility: 'F15A', status: 'yellow', type:'中科' },
  { facility: 'F15B', status: 'yellow', type:'中科' },
  { facility: 'F14A', status: 'green', type:'南科' },
  { facility: 'F14B', status: 'red', type:'南科' },  
  { facility: 'RDPC', status: 'green', type:'RDAP' },
  { facility: 'APTS', status: 'red', type:'RDAP' },
  { facility: 'F16', status: 'yellow', type:'海外' },
  { facility: 'F10', status: 'yellow', type:'海外' },
]

const emissionTypes = [
  { type: '二氧化碳', amount: 250000, unit: '噸' },
  { type: '甲烷', amount: 5000, unit: '噸' },
  { type: '氧化亞氮', amount: 1000, unit: '噸' },
  { type: '氫氟碳化物', amount: 500, unit: '噸' },
  { type: '全氟化碳', amount: 200, unit: '噸' },
  { type: '六氟化硫', amount: 100, unit: '噸' },
]

// 添加新的數據結構
const kpiData = [
  { month: '202401', scope1: 80, scope2: 20, total: 100, target: 95 },
  { month: '202402', scope1: 78, scope2: 20, total: 98, target: 94 },
  { month: '202403', scope1: 77, scope2: 20, total: 97, target: 93 },
  { month: '202404', scope1: 76, scope2: 20, total: 96, target: 92 },
  { month: '202405', scope1: 75, scope2: 20, total: 95, target: 91 },
  { month: '202406', scope1: 74, scope2: 20, total: 94, target: 90 },
  { month: '202407', scope1: 73, scope2: 20, total: 93, target: 89 },
  { month: '202408', scope1: 72, scope2: 20, total: 92, target: 88 },
  { month: '202409', scope1: 71, scope2: 20, total: 91, target: 87 },
  { month: '202410', scope1: 70, scope2: 20, total: 90, target: 86 },
  { month: '202411', scope1: 69, scope2: 20, total: 89, target: 85 },
  { month: '202412', scope1: 67, scope2: 20, total: 87, target: 84 },
];

// 更新排放數據結構
const emissionData = [
  { facility: 'F12A', item: 'CO2', '202401': 100, '202402': 102, '202403': 98, '202404': 105, '202405': 103, '202406': 101, '202407': 99, '202408': 104, '202409': 102, '202410': 100, '202411': 103, '202412': 101 , version: 'WST/TSIA'},
  { facility: 'F12A', item: 'CH4', '202401': 10, '202402': 11, '202403': 9, '202404': 12, '202405': 10, '202406': 11, '202407': 10, '202408': 11, '202409': 9, '202410': 10, '202411': 11, '202412': 10 , version: 'WST/TSIA'},
  { facility: 'F12A', item: 'N2O', '202401': 2, '202402': 2, '202403': 2, '202404': 2, '202405': 2, '202406': 2, '202407': 2, '202408': 2, '202409': 2, '202410': 2, '202411': 2, '202412': 2 ,version:'WST/TSIA'},
  { facility: 'F12A', item: 'HFCs', '202401': 1, '202402': 1, '202403': 1, '202404': 1, '202405': 1, '202406': 1, '202407': 1, '202408': 1, '202409': 1, '202410': 1, '202411': 1, '202412': 1 ,version:'WST/TSIA'},
  { facility: 'F12A', item: 'PFCs', '202401': 0.5, '202402': 0.5, '202403': 0.5, '202404': 0.5, '202405': 0.5, '202406': 0.5, '202407': 0.5, '202408': 0.5, '202409': 0.5, '202410': 0.5, '202411': 0.5, '202412': 0.5 ,version:'WST/TSIA'},
  { facility: 'F12A', item: 'SF6', '202401': 0.2, '202402': 0.2, '202403': 0.2, '202404': 0.2, '202405': 0.2, '202406': 0.2, '202407': 0.2, '202408': 0.2, '202409': 0.2, '202410': 0.2, '202411': 0.2, '202412': 0.2 ,version:'WST/TSIA'},
  { facility: 'F12A', item: 'NF3', '202401': 100, '202402': 102, '202403': 98, '202404': 105, '202405': 103, '202406': 101, '202407': 99, '202408': 104, '202409': 102, '202410': 100, '202411': 103, '202412': 101 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'CO2', '202401': 95, '202402': 97, '202403': 94, '202404': 98, '202405': 96, '202406': 95, '202407': 93, '202408': 97, '202409': 95, '202410': 94, '202411': 96, '202412': 95 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'CH4', '202401': 9, '202402': 10, '202403': 8, '202404': 11, '202405': 9, '202406': 10, '202407': 9, '202408': 10, '202409': 8, '202410': 9, '202411': 10, '202412': 9 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'N2O', '202401': 1, '202402': 1, '202403': 1, '202404': 1, '202405': 1, '202406': 1, '202407': 1, '202408': 1, '202409': 1, '202410': 1, '202411': 1, '202412': 1 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'HFCs', '202401': 0.5, '202402': 0.5, '202403': 0.5, '202404': 0.5, '202405': 0.5, '202406': 0.5, '202407': 0.5, '202408': 0.5, '202409': 0.5, '202410': 0.5, '202411': 0.5, '202412': 0.5 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'PFCs', '202401': 0.2, '202402': 0.2, '202403': 0.2, '202404': 0.2, '202405': 0.2, '202406': 0.2, '202407': 0.2, '202408': 0.2, '202409': 0.2, '202410': 0.2, '202411': 0.2, '202412': 0.2 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'SF6', '202401': 0.1, '202402': 0.1, '202403': 0.1, '202404': 0.1, '202405': 0.1, '202406': 0.1, '202407': 0.1, '202408': 0.1, '202409': 0.1, '202410': 0.1, '202411': 0.1, '202412': 0.1 ,version:'WST/TSIA'},
  { facility: 'F12B', item: 'NF3', '202401': 95, '202402': 97, '202403': 94, '202404': 98, '202405': 96, '202406': 95, '202407': 93, '202408': 97, '202409': 95, '202410': 94, '202411': 96, '202412': 95 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'CO2', '202401': 100, '202402': 102, '202403': 98, '202404': 105, '202405': 103, '202406': 101, '202407': 99, '202408': 104, '202409': 102, '202410': 100, '202411': 103, '202412': 101 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'CH4', '202401': 9, '202402': 10, '202403': 8, '202404': 11, '202405': 9, '202406': 10, '202407': 9, '202408': 10, '202409': 8, '202410': 9, '202411': 10, '202412': 9 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'N2O', '202401': 1, '202402': 1, '202403': 1, '202404': 1, '202405': 1, '202406': 1, '202407': 1, '202408': 1, '202409': 1, '202410': 1, '202411': 1, '202412': 1 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'HFCs', '202401': 0.5, '202402': 0.5, '202403': 0.5, '202404': 0.5, '202405': 0.5, '202406': 0.5, '202407': 0.5, '202408': 0.5, '202409': 0.5, '202410': 0.5, '202411': 0.5, '202412': 0.5 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'PFCs', '202401': 0.2, '202402': 0.2, '202403': 0.2, '202404': 0.2, '202405': 0.2, '202406': 0.2, '202407': 0.2, '202408': 0.2, '202409': 0.2, '202410': 0.2, '202411': 0.2, '202412': 0.2 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'SF6', '202401': 0.1, '202402': 0.1, '202403': 0.1, '202404': 0.1, '202405': 0.1, '202406': 0.1, '202407': 0.1, '202408': 0.1, '202409': 0.1, '202410': 0.1, '202411': 0.1, '202412': 0.1 ,version:'WST/TSIA'},
  { facility: 'F15A', item: 'NF3', '202401': 95, '202402': 97, '202403': 94, '202404': 98, '202405': 96, '202406': 95, '202407': 93, '202408': 97, '202409': 95, '202410': 94, '202411': 96, '202412': 95 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'CO2', '202401': 95, '202402': 97, '202403': 94, '202404': 98, '202405': 96, '202406': 95, '202407': 93, '202408': 97, '202409': 95, '202410': 94, '202411': 96, '202412': 95 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'CH4', '202401': 9, '202402': 10, '202403': 8, '202404': 11, '202405': 9, '202406': 10, '202407': 9, '202408': 10, '202409': 8, '202410': 9, '202411': 10, '202412': 9 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'N2O', '202401': 1, '202402': 1, '202403': 1, '202404': 1, '202405': 1, '202406': 1, '202407': 1, '202408': 1, '202409': 1, '202410': 1, '202411': 1, '202412': 1 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'HFCs', '202401': 0.5, '202402': 0.5, '202403': 0.5, '202404': 0.5, '202405': 0.5, '202406': 0.5, '202407': 0.5, '202408': 0.5, '202409': 0.5, '202410': 0.5, '202411': 0.5, '202412': 0.5 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'PFCs', '202401': 0.2, '202402': 0.2, '202403': 0.2, '202404': 0.2, '202405': 0.2, '202406': 0.2, '202407': 0.2, '202408': 0.2, '202409': 0.2, '202410': 0.2, '202411': 0.2, '202412': 0.2 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'SF6', '202401': 0.1, '202402': 0.1, '202403': 0.1, '202404': 0.1, '202405': 0.1, '202406': 0.1, '202407': 0.1, '202408': 0.1, '202409': 0.1, '202410': 0.1, '202411': 0.1, '202412': 0.1 ,version:'WST/TSIA'},
  { facility: 'F15B', item: 'NF3', '202401': 95, '202402': 97, '202403': 94, '202404': 98, '202405': 96, '202406': 95, '202407': 93, '202408': 97, '202409': 95, '202410': 94, '202411': 96, '202412': 95 ,version:'WST/TSIA'},
  // ... 添加更多數據
];

export default function GreenhouseGasEmissions() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filter, setFilter] = useState("")
  const [selectedScope, setSelectedScope] = useState<'scope1' | 'scope2' | 'total'>('total')
  const [selectedKpiScope, setSelectedKpiScope] = useState<'scope1' | 'scope2' | 'total'>('total')
  const [facilityFilter, setFacilityFilter] = useState<string | null>(null);
  const [itemFilter, setItemFilter] = useState<string | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);
  // 獲取所有唯一的廠區和項目
  const facilities = Array.from(new Set(emissionData.map(d => d.facility)));
  const items = Array.from(new Set(emissionData.map(d => d.item)));
  const versions = Array.from(new Set(emissionData.map(d => d.version)));

  // 篩選數據
  const filteredData = emissionData.filter(d => 
    (!facilityFilter || d.facility === facilityFilter) &&
    (!itemFilter || d.item === itemFilter) &&
    (!versionFilter || d.version === versionFilter)
  );

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = emissionTypes
    .filter(item => item.type.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortColumn === "type") {
        return sortDirection === "asc" 
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type)
      } else if (sortColumn === "amount") {
        return sortDirection === "asc" 
          ? a.amount - b.amount
          : b.amount - a.amount
      }
      return 0
    })

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="trends">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">溫室氣體大盤趨勢圖</TabsTrigger>
          <TabsTrigger value="facilities">各廠區趨勢圖</TabsTrigger>
          <TabsTrigger value="data">實際數據</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-1 overflow-hidden h-[400px] flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">當年度目標與實際值</CardTitle>
              </CardHeader>
              <CardContent className="p-2 flex-grow overflow-auto">
                <Table className="border-collapse border border-gray-300 h-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border border-gray-300 bg-gray-100">當年度</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">Total</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">Tool</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">FAC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((data) => (
                      <React.Fragment key={data.year}>
                        <TableRow>
                          <TableCell className="border border-gray-300">當年度目標</TableCell>
                          <TableCell className="border border-gray-300">{data.totalTarget.toFixed(2)}</TableCell>
                          <TableCell className="border border-gray-300">{data.toolTarget.toFixed(2)}</TableCell>
                          <TableCell className="border border-gray-300">{data.facTarget.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-gray-300">當年度實際</TableCell>
                          <TableCell className="border border-gray-300">{data.totalActual.toFixed(2)}</TableCell>
                          <TableCell className="border border-gray-300">{data.toolActual.toFixed(2)}</TableCell>
                          <TableCell className="border border-gray-300">{data.facActual.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="border border-gray-300">達成率</TableCell>
                          <TableCell className="border border-gray-300">
                            {((data.totalActual / data.totalTarget) * 100).toFixed(2)}%
                          </TableCell>
                          <TableCell className="border border-gray-300">
                            {((data.toolActual / data.toolTarget) * 100).toFixed(2)}%
                          </TableCell>
                          <TableCell className="border border-gray-300">
                           {((data.facActual / data.facTarget) * 100).toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-2 overflow-hidden h-[400px] flex flex-col">
              <CardHeader className="p-4 flex flex-row justify-between items-center">
                <CardTitle className="text-lg">溫室氣體排放趨勢 (2020-2030)</CardTitle>
                <Select value={selectedScope} onValueChange={(value: 'scope1' | 'scope2' | 'total') => setSelectedScope(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇範疇" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scope1">Scope 1</SelectItem>
                    <SelectItem value="scope2">Scope 2</SelectItem>
                    <SelectItem value="total">Scope 1 + Scope 2</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-2 flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emissionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedScope === 'scope1' && (
                      <Line type="monotone" dataKey="scope1" name="Scope 1" stroke="#8884d8" strokeWidth={2}>
                        <Label content={<CustomizedLabel />} />
                      </Line>
                    )}
                    {selectedScope === 'scope2' && (
                      <Line type="monotone" dataKey="scope2" name="Scope 2" stroke="#82ca9d" strokeWidth={2}>
                        <Label content={<CustomizedLabel />} />
                      </Line>
                    )}
                    {selectedScope === 'total' && (
                      <Line type="monotone" dataKey="total" name="Total" stroke="#ffc658" strokeWidth={2}>
                        <Label content={<CustomizedLabel />} />
                      </Line>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facilities">
          <div className="grid grid-cols-2 gap-4">
            <Card className="col-span-1 overflow-hidden h-[400px] flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">各廠區達標狀況</CardTitle>
              </CardHeader>
              <CardContent className="p-4 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="border border-gray-300 bg-gray-100">全公司</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">竹科</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">中科</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">南科</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">RDAP</TableHead>
                      <TableHead className="border border-gray-300 bg-gray-100">海外</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {['全公司', '竹科', '中科', '南科', 'RDAP', '海外'].map((type) => (
                        <TableCell key={type} className="border border-gray-300 align-top">
                          {facilityData
                            .filter(facility => facility.type === type)
                            .map((facility, index) => (
                              <div key={index} className="flex items-center mb-2">
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                  facility.status === "green" ? "bg-green-500" :
                                  facility.status === "red" ? "bg-red-500" : "bg-yellow-500"
                                }`}></span>
                                <span>{facility.facility}</span>
                              </div>
                            ))}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-1 overflow-hidden h-[400px] flex flex-col">
              <CardHeader className="p-4 flex flex-row justify-between items-center">
                <CardTitle className="text-lg">溫室氣體絕對減量KPI</CardTitle>
                <Select value={selectedKpiScope} onValueChange={(value: 'scope1' | 'scope2' | 'total') => setSelectedKpiScope(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇範疇" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scope1">Scope 1</SelectItem>
                    <SelectItem value="scope2">Scope 2</SelectItem>
                    <SelectItem value="total">Scope 1 + Scope 2</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-2 flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey={selectedKpiScope} 
                      name="實際值" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                    >
                      <Label content={<CustomizedLabel />} />
                    </Line>
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      name="目標值" 
                      stroke="#FF0000" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    >
                      <Label content={<CustomizedLabel />} />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <Card>
          <CardHeader className="p-4 flex flex-row justify-between items-center">
          <CardTitle className="text-lg">溫室氣體排放數據</CardTitle>
              <div className="flex items-center space-x-2">
                <Select onValueChange={(value) => setVersionFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇版次" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>全部版次</SelectItem>
                    {versions.map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setFacilityFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇廠區" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>全部廠區</SelectItem>
                    {facilities.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setItemFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇項目" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>全部項目</SelectItem>
                    {items.map(i => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>廠區</TableHead>
                    <TableHead>項目</TableHead>
                    {Array.from({ length: 12 }, (_, i) => (
                      <TableHead key={i}>2024{(i + 1).toString().padStart(2, '0')}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.facility}</TableCell>
                      <TableCell>{row.item}</TableCell>
                      {Array.from({ length: 12 }, (_, i) => (
                        <TableCell key={i}>{row[`2024${(i + 1).toString().padStart(2, '0')}`]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 自定義標籤組件
const CustomizedLabel = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-10} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};
