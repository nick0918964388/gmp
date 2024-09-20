"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { TsmcEsgDashboardContent } from '@/components/TsmcEsgDashboardContent'

const DashboardLayout = dynamic(() => import('@/components/DashboardLayout').then(mod => mod.default), {
  ssr: false
})

export default function TsmcEsgDashboard() {
  return (
    <DashboardLayout>
      <TsmcEsgDashboardContent />
    </DashboardLayout>
  )
}