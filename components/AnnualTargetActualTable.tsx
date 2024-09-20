import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchAnnualTargetActualData } from '@/services/greenhouseGasEmissionsService'

interface AnnualData {
  year: number;
  totalTarget: number;
  totalActual: number;
  toolTarget: number;
  toolActual: number;
  facTarget: number;
  facActual: number;
}

interface TableHeader {
  key: string;
  label: string;
}

export function AnnualTargetActualTable() {
  const [data, setData] = useState<AnnualData[]>([])
  const [headers, setHeaders] = useState<TableHeader[]>([])
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAnnualTargetActualData()
      setData(result.data as AnnualData[])
      setHeaders(result.headers as TableHeader[])
      setTitle(result.title as string)
    }
    fetchData()
  }, [])

  return (
    <Card className="col-span-1 overflow-hidden h-[400px] flex flex-col">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-grow overflow-auto">
        <Table className="border-collapse border border-gray-300 h-full">
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key} className="border border-gray-300 bg-gray-100">
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <React.Fragment key={item.year}>
                <TableRow>
                  <TableCell className="border border-gray-300">當年度目標</TableCell>
                  <TableCell className="border border-gray-300">{item.totalTarget.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300">{item.toolTarget.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300">{item.facTarget.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">當年度實際</TableCell>
                  <TableCell className="border border-gray-300">{item.totalActual.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300">{item.toolActual.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300">{item.facActual.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border border-gray-300">達成率</TableCell>
                  <TableCell className="border border-gray-300">
                    {((item.totalActual / item.totalTarget) * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    {((item.toolActual / item.toolTarget) * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className="border border-gray-300">
                   {((item.facActual / item.facTarget) * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}