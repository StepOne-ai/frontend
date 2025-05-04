"use server";

import { redirect } from "next/navigation";

type LoginMethod = "email" | "phone" | "patientId";

interface LoginData {
  method: LoginMethod;
  email?: string;
  phone?: string;
  patientId?: string;
  password: string;
}

export async function login(data: LoginData) {
  // В реальном приложении здесь будет проверка учетных данных в базе данных
  // Для демонстрации просто имитируем успешную авторизацию

  // Проверяем метод входа и соответствующие данные
  if (data.method === "email" && (!data.email || !data.password)) {
    return { success: false, message: "Введите email и пароль" };
  }

  if (data.method === "phone" && (!data.phone || !data.password)) {
    return { success: false, message: "Введите номер телефона и пароль" };
  }

  if (data.method === "patientId" && (!data.patientId || !data.password)) {
    return { success: false, message: "Введите ID пациента и пароль" };
  }

  // Имитация задержки сервера
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Устанавливаем куки для авторизации
  return { success: true };
}

export async function logout() {
  // Удаляем куки авторизации
  // Перенаправляем на страницу входа
  redirect("/");
}

export async function checkAuth() {
  // Проверяем наличие токена авторизации
  // Для демонстрации просто возвращаем информацию о пользователе
  return {
    isAuthenticated: true,
  };
}
