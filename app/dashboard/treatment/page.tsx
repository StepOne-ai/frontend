import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default function TreatmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Лечение</h1>
        <p className="text-muted-foreground">Информация о текущем плане лечения и прогрессе</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>План лечения</CardTitle>
          <CardDescription>Ортодонтическое лечение с использованием элайнеров</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Прогресс лечения</div>
                <div className="text-sm font-medium">45%</div>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-500">Всего элайнеров</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">11</div>
                <div className="text-sm text-gray-500">Использовано</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600">13</div>
                <div className="text-sm text-gray-500">Осталось</div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-medium">Текущий этап</h3>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Элайнер #11</h4>
                    <p className="text-sm text-gray-500 mt-1">Рекомендуется носить 22 часа в сутки в течение 14 дней</p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Начало:</span> 15.04.2023
                      <span className="mx-2">•</span>
                      <span className="font-medium">Окончание:</span> 29.04.2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Текущие рекомендации</TabsTrigger>
          <TabsTrigger value="schedule">График смены элайнеров</TabsTrigger>
          <TabsTrigger value="instructions">Инструкции</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Текущие рекомендации</CardTitle>
              <CardDescription>Рекомендации врача на текущем этапе лечения</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <RecommendationItem
                  icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
                  title="Носить элайнеры не менее 22 часов в сутки"
                  description="Снимать только во время приема пищи и чистки зубов"
                />
                <RecommendationItem
                  icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
                  title="Чистить элайнеры дважды в день"
                  description="Использовать специальную щетку и прохладную воду"
                />
                <RecommendationItem
                  icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
                  title="Избегать горячих напитков с элайнерами"
                  description="Горячие напитки могут деформировать элайнеры"
                />
                <RecommendationItem
                  icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
                  title="Не использовать жевательную резинку с элайнерами"
                  description="Жевательная резинка может прилипнуть к элайнерам"
                />
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>График смены элайнеров</CardTitle>
              <CardDescription>Плановые даты смены элайнеров</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Элайнер
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата начала
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата окончания
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AlignerRow number={9} startDate="18.03.2023" endDate="01.04.2023" status="completed" />
                    <AlignerRow number={10} startDate="02.04.2023" endDate="15.04.2023" status="completed" />
                    <AlignerRow number={11} startDate="16.04.2023" endDate="29.04.2023" status="current" />
                    <AlignerRow number={12} startDate="30.04.2023" endDate="13.05.2023" status="upcoming" />
                    <AlignerRow number={13} startDate="14.05.2023" endDate="27.05.2023" status="upcoming" />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Инструкции по использованию</CardTitle>
              <CardDescription>Общие инструкции по использованию элайнеров</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Как использовать элайнеры</h3>
              <ol>
                <li>Тщательно чистите зубы перед установкой элайнеров</li>
                <li>Аккуратно вставьте элайнер, начиная с передних зубов</li>
                <li>Убедитесь, что элайнер полностью сел на зубы</li>
                <li>Носите элайнеры не менее 22 часов в сутки</li>
                <li>Снимайте элайнеры только во время еды и чистки зубов</li>
              </ol>

              <h3>Уход за элайнерами</h3>
              <ul>
                <li>Чистите элайнеры дважды в день мягкой зубной щеткой</li>
                <li>Используйте прохладную воду для чистки</li>
                <li>Не используйте горячую воду, она может деформировать элайнеры</li>
                <li>Храните элайнеры в специальном контейнере, когда не используете</li>
                <li>Избегайте окрашивающих напитков (кофе, чай, красное вино) при ношении элайнеров</li>
              </ul>

              <h3>Что делать, если элайнер не подходит</h3>
              <p>
                Если вы заметили, что элайнер не подходит должным образом или вызывает сильный дискомфорт, пожалуйста,
                свяжитесь с вашим лечащим врачом как можно скорее.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface RecommendationItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function RecommendationItem({ icon, title, description }: RecommendationItemProps) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  )
}

interface AlignerRowProps {
  number: number
  startDate: string
  endDate: string
  status: "completed" | "current" | "upcoming"
}

function AlignerRow({ number, startDate, endDate, status }: AlignerRowProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Завершен
          </span>
        )
      case "current":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Текущий
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Предстоящий
          </span>
        )
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">Элайнер #{number}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{endDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge()}</td>
    </tr>
  )
}
