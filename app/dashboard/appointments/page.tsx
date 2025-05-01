"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, User } from "lucide-react"
import { ru } from "date-fns/locale"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  const doctors = [
    { id: "1", name: "Смирнова Елена Александровна", specialization: "Ортодонт" },
    { id: "2", name: "Иванов Сергей Петрович", specialization: "Стоматолог-гигиенист" },
    { id: "3", name: "Козлова Анна Михайловна", specialization: "Ортодонт" },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки данных на сервер
    alert("Запись успешно создана!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Запись на прием</h1>
        <p className="text-muted-foreground">Выберите удобную дату и время для записи к врачу</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Выберите дату</CardTitle>
              <CardDescription>Выберите удобную дату для посещения клиники</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ru}
                className="rounded-md border"
                disabled={(date) => {
                  // Отключаем прошедшие даты и выходные
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  const day = date.getDay()
                  return date < today || day === 0 || day === 6
                }}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Выберите врача</CardTitle>
                <CardDescription>Выберите специалиста для консультации</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <div className="space-y-3">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={doctor.id} id={`doctor-${doctor.id}`} />
                        <Label htmlFor={`doctor-${doctor.id}`} className="flex flex-col">
                          <span>{doctor.name}</span>
                          <span className="text-sm text-gray-500">{doctor.specialization}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Выберите время</CardTitle>
                <CardDescription>Доступное время для записи</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? "default" : "outline"}
                      className="h-10"
                      onClick={() => setSelectedTime(time)}
                      disabled={!date || !selectedDoctor}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Дополнительная информация</CardTitle>
            <CardDescription>Укажите цель визита и другую важную информацию</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Опишите цель визита или укажите дополнительную информацию для врача"
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <div className="mt-6">
          {date && selectedDoctor && selectedTime ? (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-800 mb-2">Информация о записи</h3>
              <div className="space-y-2 text-blue-700">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Дата: {date.toLocaleDateString("ru-RU")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Время: {selectedTime}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Врач: {doctors.find((d) => d.id === selectedDoctor)?.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-amber-800">Выберите дату, врача и время</h3>
              <p className="text-amber-700 text-sm">Для создания записи необходимо выбрать все параметры</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={!date || !selectedDoctor || !selectedTime}>
            Записаться на прием
          </Button>
        </div>
      </form>
    </div>
  )
}
