"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginMethod = "email" | "phone" | "patientId"

interface LoginData {
  method: LoginMethod
  email?: string
  phone?: string
  patientId?: string
  password: string
}

export async function login(data: LoginData) {
  // В реальном приложении здесь будет проверка учетных данных в базе данных
  // Для демонстрации просто имитируем успешную авторизацию

  // Проверяем метод входа и соответствующие данные
  if (data.method === "email" && (!data.email || !data.password)) {
    return { success: false, message: "Введите email и пароль" }
  }

  if (data.method === "phone" && (!data.phone || !data.password)) {
    return { success: false, message: "Введите номер телефона и пароль" }
  }

  if (data.method === "patientId" && (!data.patientId || !data.password)) {
    return { success: false, message: "Введите ID пациента и пароль" }
  }

  // Имитация задержки сервера
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Устанавливаем куки для авторизации
  cookies().set("auth-token", "demo-token-12345", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 неделя
    path: "/",
  })

  // Устанавливаем куки с информацией о пользователе
  cookies().set(
    "user-info",
    JSON.stringify({
      id: "12345678",
      name: "Иван Петров",
      email: data.email || "ivan.petrov@example.com",
      phone: data.phone || "+7 (999) 123-45-67",
    }),
    {
      maxAge: 60 * 60 * 24 * 7, // 1 неделя
      path: "/",
    },
  )

  return { success: true }
}

export async function logout() {
  // Удаляем куки авторизации
  cookies().delete("auth-token")
  cookies().delete("user-info")

  // Перенаправляем на страницу входа
  redirect("/")
}

export async function checkAuth() {
  // Проверяем наличие токена авторизации
  const token = cookies().get("auth-token")

  if (!token) {
    return { isAuthenticated: false }
  }

  // В реальном приложении здесь будет проверка токена на сервере
  // Для демонстрации просто возвращаем информацию о пользователе
  const userInfoCookie = cookies().get("user-info")
  const userInfo = userInfoCookie ? JSON.parse(userInfoCookie.value) : null

  return {
    isAuthenticated: true,
    user: userInfo,
  }
}
