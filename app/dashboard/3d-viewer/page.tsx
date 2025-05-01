"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TeethModelViewer from "@/components/teeth-model-viewer"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ThreeDViewerPage() {
  const [selectedScan, setSelectedScan] = useState("upper")
  const isMobile = useIsMobile()

  // В реальном приложении эти URL будут указывать на реальные 3D модели
  // Для демонстрации используем заглушку
  const modelUrls = {
    upper: "/assets/3d/duck.glb", // Заглушка для демонстрации
    lower: "/assets/3d/duck.glb", // Заглушка для демонстрации
    full: "/assets/3d/duck.glb", // Заглушка для демонстрации
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">3D визуализация</h1>
        <p className="text-muted-foreground text-sm md:text-base">Просмотр 3D моделей ваших зубов</p>
      </div>

      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-lg md:text-xl">3D модели зубов</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Интерактивные 3D модели ваших зубов на основе сканирования
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" className="mb-4 md:mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current" className="text-xs md:text-sm">
                Текущее состояние
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs md:text-sm">
                Прогресс лечения
              </TabsTrigger>
              <TabsTrigger value="result" className="text-xs md:text-sm">
                Ожидаемый результат
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-3 md:mt-4">
              <div className="space-y-3 md:space-y-4">
                <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-3 gap-4"}`}>
                  {isMobile ? (
                    <div className="flex overflow-x-auto pb-2 space-x-2">
                      <button
                        className={`p-2 md:p-3 rounded-lg border text-center flex-shrink-0 min-w-[120px] ${selectedScan === "upper" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("upper")}
                      >
                        <div className="font-medium text-sm">Верхняя челюсть</div>
                        <div className="text-xs text-gray-500">Скан от 15.03.2023</div>
                      </button>

                      <button
                        className={`p-2 md:p-3 rounded-lg border text-center flex-shrink-0 min-w-[120px] ${selectedScan === "lower" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("lower")}
                      >
                        <div className="font-medium text-sm">Нижняя челюсть</div>
                        <div className="text-xs text-gray-500">Скан от 15.03.2023</div>
                      </button>

                      <button
                        className={`p-2 md:p-3 rounded-lg border text-center flex-shrink-0 min-w-[120px] ${selectedScan === "full" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("full")}
                      >
                        <div className="font-medium text-sm">Полная модель</div>
                        <div className="text-xs text-gray-500">Скан от 15.03.2023</div>
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={`p-3 rounded-lg border text-center ${selectedScan === "upper" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("upper")}
                      >
                        <div className="font-medium">Верхняя челюсть</div>
                        <div className="text-sm text-gray-500">Скан от 15.03.2023</div>
                      </button>

                      <button
                        className={`p-3 rounded-lg border text-center ${selectedScan === "lower" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("lower")}
                      >
                        <div className="font-medium">Нижняя челюсть</div>
                        <div className="text-sm text-gray-500">Скан от 15.03.2023</div>
                      </button>

                      <button
                        className={`p-3 rounded-lg border text-center ${selectedScan === "full" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedScan("full")}
                      >
                        <div className="font-medium">Полная модель</div>
                        <div className="text-sm text-gray-500">Скан от 15.03.2023</div>
                      </button>
                    </>
                  )}
                </div>

                <TeethModelViewer
                  modelUrl={modelUrls[selectedScan as keyof typeof modelUrls]}
                  title={
                    selectedScan === "upper"
                      ? "Верхняя челюсть - текущее состояние"
                      : selectedScan === "lower"
                        ? "Нижняя челюсть - текущее состояние"
                        : "Полная модель - текущее состояние"
                  }
                />

                <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-1 md:mb-2 text-sm md:text-base">Комментарий врача</h3>
                  <p className="text-blue-700 text-xs md:text-sm">
                    На данной 3D модели видно текущее положение зубов. Обратите внимание на скученность в области
                    передних резцов и дистальное смещение моляров. В процессе лечения мы будем постепенно корректировать
                    эти проблемы.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-3 md:mt-4">
              <div className="space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 bg-amber-50 rounded-lg">
                  <p className="text-amber-800 text-xs md:text-sm">
                    Здесь вы можете наблюдать прогресс вашего лечения. Сравнивая текущую модель с начальной, можно
                    увидеть, как постепенно выравниваются зубы и корректируется прикус.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div className="border rounded-lg p-3 md:p-4">
                    <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Начало лечения (01.02.2023)</h3>
                    <div className="h-[200px] md:h-[300px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs md:text-sm">
                      Модель недоступна для просмотра
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 md:p-4">
                    <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Текущий прогресс (15.04.2023)</h3>
                    <div className="h-[200px] md:h-[300px]">
                      <TeethModelViewer modelUrl={modelUrls.full} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="result" className="mt-3 md:mt-4">
              <div className="space-y-3 md:space-y-4">
                <TeethModelViewer modelUrl={modelUrls.full} title="Ожидаемый результат лечения" />

                <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-1 md:mb-2 text-sm md:text-base">Прогноз результата</h3>
                  <p className="text-green-700 text-xs md:text-sm">
                    Данная 3D модель показывает ожидаемый результат после завершения лечения. Вы можете видеть, как
                    будут выглядеть ваши зубы после полного курса лечения с использованием элайнеров. Обратите внимание
                    на выравнивание зубного ряда и коррекцию прикуса.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
