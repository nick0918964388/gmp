'use client'

import dynamic from 'next/dynamic'
import { TsmcEsgDashboardContent } from '@/components/TsmcEsgDashboardContent'

const DashboardLayout = dynamic(() => import('@/components/DashboardLayout').then(mod => mod.default), {
  ssr: false
})

export default function Home() {
  return (
    <DashboardLayout>
      <TsmcEsgDashboardContent />
    </DashboardLayout>
  )
}
