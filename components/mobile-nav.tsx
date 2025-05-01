"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Calendar, FileText, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      icon: <User className="h-5 w-5" />,
      label: "Профиль",
    },
    {
      href: "/dashboard/treatment",
      icon: <FileText className="h-5 w-5" />,
      label: "Лечение",
    },
    {
      href: "/dashboard/results",
      icon: <Smile className="h-5 w-5" />,
      label: "Результаты",
    },
    {
      href: "/dashboard/appointments",
      icon: <Calendar className="h-5 w-5" />,
      label: "Запись",
    },
  ]

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3",
                pathname === item.href ? "text-blue-600" : "text-gray-600",
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Отступ для мобильной навигации */}
      <div className="md:hidden h-16"></div>
    </>
  )
}
