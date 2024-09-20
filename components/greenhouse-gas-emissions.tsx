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
import { AnnualTargetActualTable } from './AnnualTargetActualTable'
import { EmissionsTrendChart } from './EmissionsTrendChart'
import { fetchEmissionsTrendData, fetchKpiTrendData } from '@/services/greenhouseGasEmissionsService'
import { FacilityStatusTable } from './FacilityStatusTable'

export default function GreenhouseGasEmissions() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filter, setFilter] = useState("")
  const [selectedScope, setSelectedScope] = useState<'scope1' | 'scope2' | 'total'>('total')
  const [selectedKpiScope, setSelectedKpiScope] = useState<'scope1' | 'scope2' | 'total'>('total')
  const [facilityFilter, setFacilityFilter] = useState<string | null>(null);
  const [itemFilter, setItemFilter] = useState<string | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

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
            <AnnualTargetActualTable />
            <EmissionsTrendChart fetchData={fetchEmissionsTrendData} />
          </div>
        </TabsContent>

        <TabsContent value="facilities">
          <div className="grid grid-cols-3 gap-4">
            <FacilityStatusTable />
            <EmissionsTrendChart fetchData={fetchKpiTrendData} />
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
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setFacilityFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇廠區" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>全部廠區</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setItemFilter(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="選擇項目" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>全部項目</SelectItem>
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

