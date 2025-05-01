import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Уведомления</h1>
        <p className="text-muted-foreground">Важные сообщения и напоминания о вашем лечении</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все уведомления</CardTitle>
          <CardDescription>Список всех уведомлений и напоминаний</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <NotificationItem
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              title="Напоминание о приеме"
              description="Завтра в 14:30 у вас запланирован прием у врача Смирновой Елены Александровны"
              date="Сегодня, 10:00"
              type="info"
              isNew={true}
            />

            <NotificationItem
              icon={<FileText className="h-5 w-5 text-green-500" />}
              title="Новый элайнер"
              description="Пора сменить элайнер на следующий (№12). Не забудьте следовать инструкциям по использованию."
              date="Вчера, 15:30"
              type="success"
              isNew={false}
            />

            <NotificationItem
              icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
              title="Важное напоминание"
              description="Не забывайте носить элайнеры не менее 22 часов в сутки для достижения наилучших результатов."
              date="20.04.2023, 09:15"
              type="warning"
              isNew={false}
            />

            <NotificationItem
              icon={<CheckCircle className="h-5 w-5 text-green-500" />}
              title="Результаты анализов готовы"
              description="Результаты ваших анализов готовы и доступны для просмотра в разделе 'Личные данные'."
              date="15.04.2023, 14:20"
              type="success"
              isNew={false}
            />

            <NotificationItem
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              title="Напоминание о платеже"
              description="Приближается срок очередного платежа за лечение. Пожалуйста, внесите оплату до 01.05.2023."
              date="10.04.2023, 11:00"
              type="info"
              isNew={false}
            />
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">Загрузить еще</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Настройки уведомлений</CardTitle>
          <CardDescription>Управление настройками уведомлений</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Напоминания о приемах</h3>
                <p className="text-sm text-gray-500">Получать напоминания о предстоящих приемах</p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="appointment-reminders" className="mr-2" defaultChecked />
                <label htmlFor="appointment-reminders">Включено</label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Напоминания о смене элайнеров</h3>
                <p className="text-sm text-gray-500">Получать напоминания о необходимости сменить элайнер</p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="aligner-reminders" className="mr-2" defaultChecked />
                <label htmlFor="aligner-reminders">Включено</label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Напоминания о платежах</h3>
                <p className="text-sm text-gray-500">Получать напоминания о предстоящих платежах</p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="payment-reminders" className="mr-2" defaultChecked />
                <label htmlFor="payment-reminders">Включено</label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Новости и акции</h3>
                <p className="text-sm text-gray-500">Получать информацию о новостях и акциях клиники</p>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="news-notifications" className="mr-2" />
                <label htmlFor="news-notifications">Выключено</label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button>Сохранить настройки</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface NotificationItemProps {
  icon: React.ReactNode
  title: string
  description: string
  date: string
  type: "info" | "warning" | "success"
  isNew: boolean
}

function NotificationItem({ icon, title, description, date, type, isNew }: NotificationItemProps) {
  const getBgColor = () => {
    switch (type) {
      case "info":
        return "bg-blue-50"
      case "warning":
        return "bg-amber-50"
      case "success":
        return "bg-green-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${isNew ? getBgColor() : ""}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{title}</h3>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
          <p className="text-sm text-gray-700 mt-1">{description}</p>
          {isNew && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Новое
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
