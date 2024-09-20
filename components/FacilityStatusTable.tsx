import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchFacilityStatusData } from '@/services/greenhouseGasEmissionsService'

interface FacilityStatus {
  facility: string;
  status: string;
  type: string;
}

interface FacilityStatusConfig {
  headers: string[];
  statusColors: {
    [key: string]: string;
  };
}

export function FacilityStatusTable() {
  const [data, setData] = useState<FacilityStatus[]>([])
  const [config, setConfig] = useState<FacilityStatusConfig | null>(null)
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFacilityStatusData()
      setData(result.data as FacilityStatus[])
      setConfig(result.config as FacilityStatusConfig)
      setTitle(result.title as string)
    }
    fetchData()
  }, [])

  if (!config) return null;

  return (
    <Card className="col-span-1 overflow-hidden h-[400px] flex flex-col">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {config.headers.map((header) => (
                <TableHead key={header} className="border border-gray-300 bg-gray-100">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {config.headers.map((type) => (
                <TableCell key={type} className="border border-gray-300 align-top">
                  {data
                    .filter(facility => facility.type === type)
                    .map((facility, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${config.statusColors[facility.status]}`}></span>
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
  )
}