"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon, FileText, Smile, ChevronLeft } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  sender: "user" | "doctor"
  text: string
  timestamp: Date
  read: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "doctor",
      text: "Здравствуйте, Иван! Как проходит ваше лечение? Есть ли какие-то вопросы или дискомфорт при использовании элайнеров?",
      timestamp: new Date("2023-04-20T10:30:00"),
      read: true,
    },
    {
      id: "2",
      sender: "user",
      text: "Здравствуйте, доктор! В целом всё хорошо, но иногда чувствую небольшой дискомфорт при установке нового элайнера. Это нормально?",
      timestamp: new Date("2023-04-20T10:35:00"),
      read: true,
    },
    {
      id: "3",
      sender: "doctor",
      text: "Да, это абсолютно нормально. Первые 2-3 дня после установки нового элайнера может ощущаться дискомфорт и небольшое давление на зубы. Это говорит о том, что элайнер работает и перемещает зубы в нужное положение. Если дискомфорт сильный или не проходит более 3-4 дней, сообщите мне.",
      timestamp: new Date("2023-04-20T10:40:00"),
      read: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showDoctorInfo, setShowDoctorInfo] = useState(false)
  const isMobile = useIsMobile()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Имитация ответа врача
    setTimeout(() => {
      const doctorReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        text: "Спасибо за информацию! Продолжайте следовать инструкциям и носить элайнеры не менее 22 часов в сутки. Если возникнут еще вопросы, не стесняйтесь спрашивать.",
        timestamp: new Date(),
        read: false,
      }

      setMessages((prev) => [...prev, doctorReply])
    }, 3000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера"
    } else {
      return date.toLocaleDateString("ru-RU")
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Чат с врачом</h1>
        <p className="text-muted-foreground text-sm md:text-base">Общение с вашим лечащим врачом</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Информация о враче - скрыта на мобильных устройствах по умолчанию */}
        {(showDoctorInfo || !isMobile) && (
          <div className={`${isMobile ? "fixed inset-0 z-50 bg-white p-4" : "md:col-span-1"}`}>
            {isMobile && (
              <Button variant="ghost" size="sm" className="mb-4" onClick={() => setShowDoctorInfo(false)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Назад к чату
              </Button>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Ваш врач</CardTitle>
                <CardDescription className="text-xs md:text-sm">Информация о вашем лечащем враче</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Фото врача" />
                    <AvatarFallback>ЕС</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-base md:text-lg">Смирнова Елена Александровна</h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-2">Ортодонт</p>
                  <p className="text-xs md:text-sm text-gray-500">Опыт работы: 12 лет</p>

                  <div className="mt-4 w-full">
                    <Button variant="outline" className="w-full text-sm">
                      Записаться на прием
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={`${isMobile ? "col-span-1" : "md:col-span-3"}`}>
          <Card className="flex flex-col h-[500px] md:h-[600px]">
            <CardHeader className="border-b py-3 md:py-4">
              <div className="flex items-center">
                {isMobile ? (
                  <Button variant="ghost" size="sm" className="mr-2" onClick={() => setShowDoctorInfo(true)}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Фото врача" />
                      <AvatarFallback>ЕС</AvatarFallback>
                    </Avatar>
                  </Button>
                ) : (
                  <Avatar className="mr-3 h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Фото врача" />
                    <AvatarFallback>ЕС</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <CardTitle className="text-base md:text-lg">Смирнова Елена Александровна</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Онлайн</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-3 md:p-4">
              <div className="space-y-4 md:space-y-6">
                {messages.map((message, index) => {
                  const showDate =
                    index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="text-center my-3 md:my-4">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      )}

                      <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-end gap-1 md:gap-2 max-w-[85%] md:max-w-[80%]">
                          {message.sender === "doctor" && (
                            <Avatar className="w-6 h-6 md:w-8 md:h-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Фото врача" />
                              <AvatarFallback>ЕС</AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={`rounded-lg p-2 md:p-3 ${
                              message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="text-xs md:text-sm">{message.text}</p>
                            <div
                              className={`text-[10px] md:text-xs mt-1 ${
                                message.sender === "user" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <div className="p-2 md:p-4 border-t">
              <div className="flex items-center gap-1 md:gap-2">
                {!isMobile && (
                  <>
                    <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                      <Paperclip className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                      <ImageIcon className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                      <FileText className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </>
                )}
                <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                  <Smile className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Input
                  placeholder="Введите сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                  className="text-xs md:text-sm h-8 md:h-9"
                />
                <Button onClick={handleSendMessage} size={isMobile ? "sm" : "default"} className="h-8 md:h-9">
                  <Send className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
