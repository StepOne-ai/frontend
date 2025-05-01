"use client"

import { useState, useEffect } from "react"

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Проверяем при первой загрузке
    checkIsMobile()

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", checkIsMobile)

    // Очищаем слушатель при размонтировании компонента
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [breakpoint])

  return isMobile
}
