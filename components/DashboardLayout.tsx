'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Settings, HelpCircle, User, Leaf, BarChart2, Globe, Building2, Zap, Droplet, ChevronRight, ChevronDown, Menu, ChevronLeft } from "lucide-react"
import { LoadingSkeleton } from './LoadingSkeleton'

const sidebarItems = [
  {
    name: "溫室氣體",
    icon: Leaf,
    children: [
      { name: "溫室氣體管理", icon: ChevronRight, link: "/page/greenhouse-gas-emissions" },
    ],
  },
  {
    name: "能源管理",
    icon: Zap,
    children: [
      {
        name: "PWR用電量報表",
        icon: ChevronRight,
        children: [
          { name: "PowerBI用電分析大盤", icon: ChevronRight },
          { name: "全公司用電資訊(L-1)", icon: ChevronRight },
          { name: "各廠用電趨勢(L-2)", icon: ChevronRight },
          { name: "部門用電資訊(L-3)", icon: ChevronRight },
          { name: "設備用電資訊(L-4)", icon: ChevronRight },
          { name: "綠能資訊網", icon: ChevronRight },
        ],
      },
      {
        name: "ISO50001",
        icon: ChevronRight,
        children: [
          { name: "能源使用", icon: ChevronRight },
          { name: "績效管理", icon: ChevronRight },
          { name: "能源管理標的", icon: ChevronRight },
          { name: "總體進度管理", icon: ChevronRight },
          { name: "文件管理", icon: ChevronRight },
        ],
      },
      { name: "節能管理", icon: ChevronRight },
      { name: "能源管理", icon: ChevronRight },
    ],
  },
  { name: "綠建築", icon: Building2 },
  {
    name: "水管理",
    icon: Droplet,
    children: [
      { name: "水資源管理", icon: ChevronRight },
      { name: "再生水管理", icon: ChevronRight },
    ],
  },
  {
    name: "資源管理",
    icon: BarChart2,
    children: [
      { name: "資源循環管理", icon: ChevronRight },
      { name: "廠商管理", icon: ChevronRight },
      { name: "廢棄物委外量與種類", icon: ChevronRight },
      { name: "三零專案", icon: ChevronRight },
      { name: "廠內資源再生活化", icon: ChevronRight },
      { name: "零廢製造中心", icon: ChevronRight },
      { name: "廠務年度減量目標與執行狀況", icon: ChevronRight },
    ],
  },
  {
    name: "空氣汙染防制",
    icon: Globe,
    children: [
      { name: "空氣汙染管理", icon: ChevronRight },
    ],
  },
  {
    name: "管理功能區",
    icon: Settings,
    children: [
      { name: "Enviromental indicators 大盤", icon: ChevronRight },
      { name: "資料上傳區", icon: ChevronRight },
      { name: "權限管理", icon: ChevronRight },
      { name: "核簽開單", icon: ChevronRight },
    ],
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [pageTitle, setPageTitle] = useState("Dashboard")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isSidebarCollapsed')
      return saved !== null ? JSON.parse(saved) : false
    }
    return false
  })
  const [isHovered, setIsHovered] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    localStorage.setItem('isSidebarCollapsed', JSON.stringify(isSidebarCollapsed))
  }, [isSidebarCollapsed])

  useEffect(() => {
    // 根據路徑設置頁面標題
    if (pathname === '/') {
      setPageTitle("Dashboard")
    } else if (pathname === '/page/greenhouse-gas-emissions') {
      setPageTitle("溫室氣體管理")
    }
    // 可以根據需要添加更多路徑判斷
  }, [pathname])

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const renderSidebarItem = (item: any, depth = 0) => (
    <div key={item.name} className="mb-2">
      {item.link ? (
        <Link href={item.link} passHref>
          <button
            className={`flex items-center w-full text-left px-4 py-2 hover:bg-teal-100 transition-colors text-teal-900 ${depth > 0 ? 'pl-8' : ''}`}
          >
            {item.icon && <item.icon className="w-5 h-5 mr-2" />}
            {(!isSidebarCollapsed || isHovered) && <span>{item.name}</span>}
          </button>
        </Link>
      ) : (
        <button
          className={`flex items-center w-full text-left px-4 py-2 hover:bg-teal-100 transition-colors text-teal-900 ${depth > 0 ? 'pl-8' : ''}`}
          onClick={() => item.children && toggleExpand(item.name)}
        >
          {item.icon && <item.icon className="w-5 h-5 mr-2" />}
          {(!isSidebarCollapsed || isHovered) && <span>{item.name}</span>}
          {(!isSidebarCollapsed || isHovered) && item.children && (
            expandedItems.includes(item.name) ? <ChevronDown className="ml-auto" /> : <ChevronRight className="ml-auto" />
          )}
        </button>
      )}
      {(!isSidebarCollapsed || isHovered) && item.children && expandedItems.includes(item.name) && (
        <div className="ml-4">
          {item.children.map((child: any) => renderSidebarItem(child, depth + 1))}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex h-screen bg-[#f0fdf4]">
      {/* Sidebar */}
      <div 
        className={`bg-teal-50 text-teal-900 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarCollapsed && !isHovered ? 'w-16' : 'w-64'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 font-bold text-1xl flex items-center justify-between">
          {(!isSidebarCollapsed || isHovered) && (
            <Link href="/" className="text-teal-900 hover:text-teal-700 transition-colors">
              tsmc ESG platform
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-teal-700 hover:bg-teal-100"
          >
            {isSidebarCollapsed && !isHovered ? <Menu className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="mt-8">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white text-teal-900 p-4 flex justify-between items-center shadow-sm">
          <h4 className="text-1xl font-bold">{pageTitle}</h4>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-teal-700 border-teal-300 hover:bg-teal-50">
              生成報告
            </Button>
            <Settings className="w-6 h-6 text-teal-600" />
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <User className="w-6 h-6 text-teal-600" />
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto">
          {isLoading ? <LoadingSkeleton /> : children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;