"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, RefreshCw, Mic, Paperclip, X, File } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { zhTW } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  content: string
  isUser: boolean
  timestamp: Date
}

type AttachedFile = {
  name: string
  type: string
}

interface ChatbotProps {
  onClose: () => void
}

const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamedResponse, setStreamedResponse] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    "如何減少晶片製造中的用水量？",
    "台積電的碳中和目標",
    "可持續的供應鏈實踐"
  ]

  const initializeChat = () => {
    setMessages([{ content: "歡迎使用台積電的 ESG 助手！今天我能如何協助您了解我們的可持續發展計劃？", isUser: false, timestamp: new Date() }])
  }

  useEffect(() => {
    if (messages.length === 0) {
      initializeChat()
    }
  }, [messages.length])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, streamedResponse])

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      setRecordingTime(0)
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [isRecording])

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return formatDistanceToNow(date, { addSuffix: true, locale: zhTW })
    } else {
      return format(date, "HH:mm", { locale: zhTW })
    }
  }

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "" && !attachedFile) return

    let fullMessage = message
    if (attachedFile) {
      fullMessage += ` [附加檔案: ${attachedFile.name}]`
    }

    const newMessage: Message = { content: fullMessage, isUser: true, timestamp: new Date() }
    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setAttachedFile(null)
    setIsLoading(true)

    // 模擬 API 調用和流式回應
    const response = `這是一個與台積電 ESG 計劃相關的模擬 AI 回應："${fullMessage}"。在實際實現中，這裡會提供有關台積電在半導體製造中的環境、社會和治理實踐的信息。`
    setStreamedResponse("")

    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setStreamedResponse((prev) => prev + response[i])
    }

    const aiResponse: Message = { content: response, isUser: false, timestamp: new Date() }
    setMessages((prev) => [...prev, aiResponse])
    setStreamedResponse("")
    setIsLoading(false)
  }

  const handleRenewChat = () => {
    setMessages([])
    setStreamedResponse("")
    setIsLoading(false)
    setAttachedFile(null)
    initializeChat()
  }

  const handleVoiceInput = () => {
    if (isRecording) {
      // 停止錄音並發送訊息
      setIsRecording(false)
      handleSendMessage(`語音訊息 (${recordingTime} 秒)`)
    } else {
      // 開始錄音
      setIsRecording(true)
    }
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachedFile({
        name: file.name,
        type: file.type,
      })
    }
  }

  return (
    <Card className="w-[400px] h-[600px] flex flex-col bg-white border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-[#2c7a7b] text-white">
        <CardTitle className="text-xl font-semibold">台積電 ESG 助手</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRenewChat}
            title="重新開始對話"
            className="text-white hover:bg-[#38a169]"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">重新開始對話</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="關閉聊天機器人"
            className="text-white hover:bg-[#38a169]"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">關閉聊天機器人</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-4">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isUser && (
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarFallback>台積電</AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </Avatar>
              )}
              <div className={`flex flex-col ${message.isUser ? "items-end" : "items-start"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.isUser
                      ? "bg-[#38a169] text-white"
                      : "bg-[#e6fffa] text-[#2c7a7b]"
                  }`}
                >
                  {message.content}
                </span>
                <div className="text-xs text-[#718096] mt-1">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
              {message.isUser && (
                <Avatar className="w-8 h-8 ml-2">
                  <AvatarFallback>用戶</AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </Avatar>
              )}
            </div>
          ))}
          {streamedResponse && (
            <div className="mb-4 flex justify-start">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>台積電</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <span className="inline-block p-2 rounded-lg bg-[#e6fffa] text-[#2c7a7b]">
                {streamedResponse}
              </span>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center space-x-2 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback>台積電</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <div className="w-8 h-8 rounded-full bg-[#e6fffa] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#2c7a7b]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
              <span className="text-sm text-[#718096]">台積電 ESG 助手正在思考中...</span>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 bg-[#f0f7f4] border-t border-[#e2e8f0] p-4">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(suggestion)}
                className="text-[#2c7a7b] border-[#2c7a7b] hover:bg-[#e6fffa] hover:text-[#38a169]"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        <div className="flex w-full space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            title={isRecording ? "停止錄音" : "開始語音錄音"}
            className="text-[#2c7a7b] border-[#2c7a7b] hover:bg-[#e6fffa] hover:text-[#38a169]"
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">{isRecording ? "停止錄音" : "開始語音錄音"}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAttachment}
            title="附加檔案"
            className="text-[#2c7a7b] border-[#2c7a7b] hover:bg-[#e6fffa] hover:text-[#38a169]"
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">附加檔案</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          <div className="relative flex-grow">
            <Input
              placeholder="輸入您的訊息..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage(inputMessage)
              }}
              className={`bg-white border-[#2c7a7b] focus:border-[#38a169] focus:ring-[#38a169] ${attachedFile ? "pl-10" : ""}`}
            />
            {attachedFile && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
                <File className="h-4 w-4 text-[#718096] mr-1" />
                <span className="text-xs text-[#718096] truncate max-w-[100px]">
                  {attachedFile.name}
                </span>
              </div>
            )}
          </div>
          <Button onClick={() => handleSendMessage(inputMessage)} disabled={isLoading} className="bg-[#38a169] hover:bg-[#2c7a7b] text-white">
            <Send className="h-4 w-4" />
            <span className="sr-only">發送</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Chatbot;