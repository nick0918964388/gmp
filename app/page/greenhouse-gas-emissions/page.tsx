'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import GreenhouseGasEmissions from '@/components/greenhouse-gas-emissions'

const DashboardLayout = dynamic(() => import('@/components/DashboardLayout').then(mod => mod.default), {
  ssr: false
})

export default function GreenhouseGasEmissionsPage() {
  return (
    <DashboardLayout>
      <GreenhouseGasEmissions />
    </DashboardLayout>
  )
}