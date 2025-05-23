"use server";

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
  console.log(data);
  return { success: true };
}

export async function logout() {
  // Удаляем куки авторизации
  // Перенаправляем на страницу входа
}
