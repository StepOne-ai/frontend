import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Download, Eye } from "lucide-react"

export default function ResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Результаты лечения</h1>
        <p className="text-muted-foreground">Визуализация результатов лечения и дизайн улыбки</p>
      </div>

      <Tabs defaultValue="smile-design">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smile-design">Дизайн улыбки</TabsTrigger>
          <TabsTrigger value="simulation">Симуляция лечения</TabsTrigger>
        </TabsList>

        <TabsContent value="smile-design" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Дизайн улыбки</CardTitle>
              <CardDescription>Визуализация вашей будущей улыбки после завершения лечения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-medium">До лечения</h3>
                    </div>
                    <div className="p-4">
                      <div className="relative h-64 bg-gray-100 rounded">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="До лечения"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <h3 className="font-medium">После лечения (прогноз)</h3>
                    </div>
                    <div className="p-4">
                      <div className="relative h-64 bg-gray-100 rounded">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          alt="После лечения"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Скачать изображения
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Просмотр в 3D
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Комментарий врача</h3>
                  <p className="text-blue-700 text-sm">
                    После завершения лечения мы ожидаем значительное улучшение положения зубов и выравнивание зубного
                    ряда. Прикус будет скорректирован, что улучшит не только эстетику улыбки, но и функциональность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Симуляция лечения</CardTitle>
              <CardDescription>Поэтапная визуализация процесса лечения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Этап 11 из 24</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="relative h-80 bg-gray-100 rounded">
                      <Image
                        src="/placeholder.svg?height=400&width=800"
                        alt="Симуляция лечения"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="w-full max-w-md bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium">Начало лечения</h3>
                    </div>
                    <div className="p-3">
                      <div className="relative h-32 bg-gray-100 rounded">
                        <Image
                          src="/placeholder.svg?height=150&width=200"
                          alt="Начало лечения"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium">Текущий этап</h3>
                    </div>
                    <div className="p-3">
                      <div className="relative h-32 bg-gray-100 rounded">
                        <Image
                          src="/placeholder.svg?height=150&width=200"
                          alt="Текущий этап"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium">Финальный результат</h3>
                    </div>
                    <div className="p-3">
                      <div className="relative h-32 bg-gray-100 rounded">
                        <Image
                          src="/placeholder.svg?height=150&width=200"
                          alt="Финальный результат"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    Просмотр полной анимации
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
