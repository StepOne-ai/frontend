import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, User } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">История</h1>
        <p className="text-muted-foreground">История посещений, операций и лечения</p>
      </div>

      <Tabs defaultValue="visits">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visits">Посещения</TabsTrigger>
          <TabsTrigger value="procedures">Процедуры</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
        </TabsList>

        <TabsContent value="visits" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>История посещений</CardTitle>
              <CardDescription>Все ваши визиты в клинику</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <VisitItem
                  date="15.04.2023"
                  time="14:30"
                  doctor="Смирнова Елена Александровна"
                  purpose="Контрольный осмотр, выдача элайнера #11"
                  status="completed"
                />
                <VisitItem
                  date="01.04.2023"
                  time="15:00"
                  doctor="Смирнова Елена Александровна"
                  purpose="Контрольный осмотр, выдача элайнера #10"
                  status="completed"
                />
                <VisitItem
                  date="18.03.2023"
                  time="10:30"
                  doctor="Смирнова Елена Александровна"
                  purpose="Контрольный осмотр, выдача элайнера #9"
                  status="completed"
                />
                <VisitItem
                  date="04.03.2023"
                  time="11:00"
                  doctor="Смирнова Елена Александровна"
                  purpose="Контрольный осмотр, выдача элайнера #8"
                  status="completed"
                />
                <VisitItem
                  date="18.02.2023"
                  time="14:00"
                  doctor="Смирнова Елена Александровна"
                  purpose="Контрольный осмотр, выдача элайнера #7"
                  status="completed"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Процедуры и лечение</CardTitle>
              <CardDescription>История всех проведенных процедур</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ProcedureItem
                  date="15.04.2023"
                  name="Контрольный осмотр"
                  doctor="Смирнова Елена Александровна"
                  description="Проверка прогресса лечения, коррекция плана лечения"
                />
                <ProcedureItem
                  date="01.04.2023"
                  name="Контрольный осмотр"
                  doctor="Смирнова Елена Александровна"
                  description="Проверка прогресса лечения"
                />
                <ProcedureItem
                  date="01.03.2023"
                  name="Профессиональная гигиена полости рта"
                  doctor="Иванов Сергей Петрович"
                  description="Ультразвуковая чистка зубов, полировка, фторирование"
                />
                <ProcedureItem
                  date="15.02.2023"
                  name="Установка аттачментов"
                  doctor="Смирнова Елена Александровна"
                  description="Установка композитных аттачментов для лучшей фиксации элайнеров"
                />
                <ProcedureItem
                  date="01.02.2023"
                  name="3D сканирование зубов"
                  doctor="Смирнова Елена Александровна"
                  description="Создание цифровой модели зубов для планирования лечения"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>История платежей</CardTitle>
              <CardDescription>Информация о всех платежах за лечение</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Описание
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Сумма
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <PaymentRow
                      date="01.02.2023"
                      description="Оплата за ортодонтическое лечение (первый взнос)"
                      amount="50 000 ₽"
                      status="paid"
                    />
                    <PaymentRow
                      date="01.03.2023"
                      description="Оплата за ортодонтическое лечение (второй взнос)"
                      amount="50 000 ₽"
                      status="paid"
                    />
                    <PaymentRow
                      date="01.04.2023"
                      description="Оплата за ортодонтическое лечение (третий взнос)"
                      amount="50 000 ₽"
                      status="paid"
                    />
                    <PaymentRow
                      date="01.05.2023"
                      description="Оплата за ортодонтическое лечение (четвертый взнос)"
                      amount="50 000 ₽"
                      status="pending"
                    />
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Общая стоимость лечения</h3>
                    <p className="text-sm text-gray-500">Полная стоимость ортодонтического лечения</p>
                  </div>
                  <div className="text-xl font-bold">200 000 ₽</div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Оплачено</h3>
                    <p className="text-sm text-gray-500">Сумма внесенных платежей</p>
                  </div>
                  <div className="text-xl font-bold text-green-600">150 000 ₽</div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Осталось оплатить</h3>
                    <p className="text-sm text-gray-500">Оставшаяся сумма к оплате</p>
                  </div>
                  <div className="text-xl font-bold text-amber-600">50 000 ₽</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VisitItemProps {
  date: string
  time: string
  doctor: string
  purpose: string
  status: "completed" | "upcoming" | "cancelled"
}

function VisitItem({ date, time, doctor, purpose, status }: VisitItemProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Завершен
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Предстоящий
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Отменен
          </span>
        )
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{date}</h3>
              <div className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {time}
              </div>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-gray-700 mt-1">{purpose}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <User className="h-3 w-3 mr-1" />
              {doctor}
            </div>
          </div>
        </div>

        <div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Детали
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ProcedureItemProps {
  date: string
  name: string
  doctor: string
  description: string
}

function ProcedureItem({ date, name, doctor, description }: ProcedureItemProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{name}</h3>
              <div className="text-sm text-gray-500">{date}</div>
            </div>
            <p className="text-sm text-gray-700 mt-1">{description}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <User className="h-3 w-3 mr-1" />
              {doctor}
            </div>
          </div>
        </div>

        <div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}

interface PaymentRowProps {
  date: string
  description: string
  amount: string
  status: "paid" | "pending" | "failed"
}

function PaymentRow({ date, description, amount, status }: PaymentRowProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Оплачено
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Ожидается
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Ошибка
          </span>
        )
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{amount}</td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge()}</td>
    </tr>
  )
}
