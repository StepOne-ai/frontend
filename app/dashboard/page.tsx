import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Личные данные</h1>
        <p className="text-muted-foreground">Просмотр результатов сканирования, КТ, фото и общих сведений</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Общие сведения</CardTitle>
            <CardDescription>Основная информация о пациенте</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ФИО</h3>
                  <p>Петров Иван Сергеевич</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Дата рождения</h3>
                  <p>12.05.1985</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
                  <p>+7 (999) 123-45-67</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>ivan.petrov@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Лечащий врач</h3>
                  <p>Смирнова Елена Александровна</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Диагноз</h3>
                  <p>Дистальная окклюзия, скученность зубов</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">План лечения</h3>
                  <p>Ортодонтическое лечение с использованием элайнеров</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Статус</h3>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    В процессе лечения
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="scans">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scans">Сканирование</TabsTrigger>
            <TabsTrigger value="ct">КТ</TabsTrigger>
            <TabsTrigger value="photos">Фото</TabsTrigger>
          </TabsList>

          <TabsContent value="scans" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Результаты сканирования</CardTitle>
                <CardDescription>3D модели зубов пациента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScanCard title="Верхняя челюсть" date="15.03.2023" image="/placeholder.svg?height=200&width=300" />
                  <ScanCard title="Нижняя челюсть" date="15.03.2023" image="/placeholder.svg?height=200&width=300" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ct" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Компьютерная томография</CardTitle>
                <CardDescription>Результаты КТ исследования</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScanCard
                    title="КТ верхней и нижней челюсти"
                    date="10.03.2023"
                    image="/placeholder.svg?height=200&width=300"
                  />
                  <ScanCard
                    title="КТ височно-нижнечелюстного сустава"
                    date="10.03.2023"
                    image="/placeholder.svg?height=200&width=300"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Фотографии</CardTitle>
                <CardDescription>Фотографии до и в процессе лечения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ScanCard title="Фронтальное фото" date="01.03.2023" image="/placeholder.svg?height=200&width=200" />
                  <ScanCard
                    title="Боковое фото (правая сторона)"
                    date="01.03.2023"
                    image="/placeholder.svg?height=200&width=200"
                  />
                  <ScanCard
                    title="Боковое фото (левая сторона)"
                    date="01.03.2023"
                    image="/placeholder.svg?height=200&width=200"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ScanCardProps {
  title: string
  date: string
  image: string
}

function ScanCard({ title, date, image }: ScanCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="relative h-48 bg-gray-100">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">Дата: {date}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Просмотр
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Скачать
          </Button>
        </div>
      </div>
    </div>
  )
}
