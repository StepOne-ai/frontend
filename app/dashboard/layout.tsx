import type React from "react"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  User,
  Calendar,
  FileText,
  History,
  Smile,
  Menu,
  LogOut,
  Bell,
  MessageSquare,
  CreditCard,
  Home,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logout } from "../actions/auth"
import DashboardClient from "./layout.client"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardClient />
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
                <div className="py-4 h-full flex flex-col">
                  <div className="px-4 pb-4 border-b">
                    <Link href="/dashboard" className="font-bold text-xl text-blue-600 flex items-center">
                      <Home className="h-5 w-5 mr-2" />
                      DHC Perfect Smile
                    </Link>
                  </div>
                  <div className="px-4 py-4 border-b">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Иван Петров</div>
                        <div className="text-sm text-gray-500">ID: 12345678</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <nav className="space-y-1 px-2">
                      <MobileNavItem href="/dashboard" icon={<User className="h-5 w-5" />} label="Личные данные" />
                      <MobileNavItem
                        href="/dashboard/treatment"
                        icon={<FileText className="h-5 w-5" />}
                        label="Лечение"
                      />
                      <MobileNavItem
                        href="/dashboard/results"
                        icon={<Smile className="h-5 w-5" />}
                        label="Результаты"
                      />
                      <MobileNavItem
                        href="/dashboard/3d-viewer"
                        icon={<Smile className="h-5 w-5" />}
                        label="3D Модели"
                      />
                      <MobileNavItem href="/dashboard/history" icon={<History className="h-5 w-5" />} label="История" />
                      <MobileNavItem
                        href="/dashboard/appointments"
                        icon={<Calendar className="h-5 w-5" />}
                        label="Записаться"
                      />
                      <MobileNavItem
                        href="/dashboard/payments"
                        icon={<CreditCard className="h-5 w-5" />}
                        label="Оплата"
                      />
                      <MobileNavItem
                        href="/dashboard/chat"
                        icon={<MessageSquare className="h-5 w-5" />}
                        label="Чат с врачом"
                      />
                      <MobileNavItem
                        href="/dashboard/notifications"
                        icon={<Bell className="h-5 w-5" />}
                        label="Уведомления"
                      />
                    </nav>
                  </div>
                  <div className="px-4 py-4 border-t mt-auto">
                    <form action={logout}>
                      <Button variant="ghost" className="w-full justify-start text-red-600">
                        <LogOut className="h-5 w-5 mr-2" />
                        Выйти
                      </Button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="font-bold text-xl text-blue-600">
              DHC Perfect Smile
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>

            <div className="hidden md:block">
              <span className="text-sm text-gray-500">Добро пожаловать,</span>
              <span className="font-medium ml-1">Иван Петров</span>
            </div>

            <form action={logout} className="hidden md:block">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar - скрыт на мобильных устройствах */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-[5rem]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="font-medium">Иван Петров</div>
              <div className="text-sm text-gray-500">ID: 12345678</div>
            </div>

            <nav className="space-y-1">
              <NavItem href="/dashboard" icon={<User className="h-5 w-5" />} label="Личные данные" />
              <NavItem href="/dashboard/treatment" icon={<FileText className="h-5 w-5" />} label="Лечение" />
              <NavItem href="/dashboard/results" icon={<Smile className="h-5 w-5" />} label="Результаты" />
              <NavItem href="/dashboard/3d-viewer" icon={<Smile className="h-5 w-5" />} label="3D Модели" />
              <NavItem href="/dashboard/history" icon={<History className="h-5 w-5" />} label="История" />
              <NavItem href="/dashboard/appointments" icon={<Calendar className="h-5 w-5" />} label="Записаться" />
              <NavItem href="/dashboard/payments" icon={<CreditCard className="h-5 w-5" />} label="Оплата" />
              <NavItem href="/dashboard/chat" icon={<MessageSquare className="h-5 w-5" />} label="Чат с врачом" />
              <NavItem href="/dashboard/notifications" icon={<Bell className="h-5 w-5" />} label="Уведомления" />
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Мобильная навигация внизу экрана */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around items-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 px-3">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Профиль</span>
          </Link>
          <Link href="/dashboard/treatment" className="flex flex-col items-center py-2 px-3">
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Лечение</span>
          </Link>
          <Link href="/dashboard/results" className="flex flex-col items-center py-2 px-3">
            <Smile className="h-5 w-5" />
            <span className="text-xs mt-1">Результаты</span>
          </Link>
          <Link href="/dashboard/appointments" className="flex flex-col items-center py-2 px-3">
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Запись</span>
          </Link>
        </div>
      </div>
      {/* Отступ для мобильной навигации */}
      <div className="md:hidden h-16"></div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function MobileNavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}
