"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Leaf, BarChart2, Globe, Building2, Zap, Droplet, MessageCircle, X, Search, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Chatbot from "./chatbot"

const performanceData = [
  { month: "1月", Environmental: 85, Social: 78, Governance: 92 },
  { month: "2月", Environmental: 88, Social: 80, Governance: 90 },
  { month: "3月", Environmental: 87, Social: 82, Governance: 91 },
  { month: "4月", Environmental: 89, Social: 81, Governance: 93 },
  { month: "5月", Environmental: 90, Social: 83, Governance: 92 },
  { month: "6月", Environmental: 91, Social: 84, Governance: 94 },
]

const generateTrendData = (baseValue: number, variance: number) => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 10 }, (_, i) => ({
    year: currentYear - 9 + i,
    target: baseValue + i * (variance / 2),
    actual: baseValue + i * (variance / 2) + (Math.random() - 0.5) * variance
  }))
}

const esgCategories = [
  { name: "溫室氣體排放", description: "追蹤並減少半導體製造過程中的溫室氣體排放。", icon: Leaf, target: "減少10%", actual: "減少8%", trendData: generateTrendData(100, 10) },
  { name: "水資源管理", description: "優化晶片生產過程中的用水和回收利用。", icon: Droplet, target: "回收率85%", actual: "回收率82%", trendData: generateTrendData(70, 15) },
  { name: "能源管理", description: "提高晶圓廠和營運中的能源效率。", icon: Zap, target: "效率提升15%", actual: "效率提升12%", trendData: generateTrendData(80, 20) },
  { name: "零廢管理", description: "實施零廢棄物策略，最大化資源回收和再利用。", icon: BarChart2, target: "回收率95%", actual: "回收率92%", trendData: generateTrendData(90, 5) },
  { name: "空氣汙染防制", description: "管控和減少製程中的空氣污染物排放。", icon: Globe, target: "減排20%", actual: "減排18%", trendData: generateTrendData(75, 10) },
  { name: "綠建築", description: "採用綠建築標準，提升建築能源效率。", icon: Building2, target: "所有新建築取得綠建築認證", actual: "90%新建築取得認證", trendData: generateTrendData(85, 15) },
]

export function TsmcEsgDashboardContent() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <>
      <div className="mb-6 relative">
        {isSearchExpanded ? (
          <Input 
            type="text" 
            placeholder="搜索 ESG 指標..." 
            className="bg-white border-teal-300 focus:ring-teal-500 pr-10" 
            autoFocus
            onBlur={() => setIsSearchExpanded(false)}
          />
        ) : (
          <Button 
            variant="outline" 
            className="w-full justify-start text-left text-teal-600"
            onClick={() => setIsSearchExpanded(true)}
          >
            <Search className="w-5 h-5 mr-2" />
            搜索 ESG 指標...
          </Button>
        )}
      </div>

      <Tabs defaultValue="概覽" className="mb-6">
        <TabsList className="bg-teal-50 p-1 rounded-lg">
          <TabsTrigger value="概覽" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">概覽</TabsTrigger>
          <TabsTrigger value="環境" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">環境</TabsTrigger>
          <TabsTrigger value="社會" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">社會</TabsTrigger>
          <TabsTrigger value="治理" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">治理</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {esgCategories.map((category) => (
          <Card key={category.name} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                <category.icon className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-teal-900 flex-grow">{category.name}</CardTitle>
              {category.target && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0">
                      <TrendingUp className="w-5 h-5 text-teal-600" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{category.name} 趨勢圖</DialogTitle>
                    </DialogHeader>
                    {/* 如果您有 TrendChart 組件，可以在這裡使用 */}
                    {/* <TrendChart data={category.trendData} title={category.name} /> */}
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              {category.target && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">2024年目標：</span>
                    <span className="text-green-600">{category.target}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-semibold">實際：</span>
                    <span className="text-blue-600">{category.actual}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-teal-900">ESG 績效趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip />
              <Line type="monotone" dataKey="Environmental" name="環境" stroke="#10B981" />
              <Line type="monotone" dataKey="Social" name="社會" stroke="#3B82F6" />
              <Line type="monotone" dataKey="Governance" name="治理" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chatbot toggle button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-teal-500 hover:bg-teal-600 text-white shadow-lg"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      >
        {isChatbotOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="sr-only">切換聊天</span>
      </Button>

      {/* Chatbot */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}