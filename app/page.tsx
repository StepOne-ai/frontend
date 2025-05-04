"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login } from "./actions/auth";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    patientId: "",
    password: "",
    passwordPhone: "",
    passwordId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (method: "email" | "phone" | "patientId") => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await login({
        method,
        email: method === "email" ? formData.email : undefined,
        phone: method === "phone" ? formData.phone : undefined,
        patientId: method === "patientId" ? formData.patientId : undefined,
        password:
          method === "email"
            ? formData.password
            : method === "phone"
              ? formData.passwordPhone
              : formData.passwordId,
      });

      if (true) {
        router.push("/dashboard");
      } else {
        setError(result.message || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Произошла ошибка при авторизации");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            DHC Perfect Smile
          </h1>
          <p className="text-gray-500 mt-2">Вход в личный кабинет</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Авторизация</CardTitle>
            <CardDescription>
              Войдите в личный кабинет, чтобы получить доступ к вашим данным
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Телефон</TabsTrigger>
                <TabsTrigger value="id">ID пациента</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit("email");
                  }}
                >
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit("phone");
                  }}
                >
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Номер телефона</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="passwordPhone">Пароль</Label>
                      <Input
                        id="passwordPhone"
                        type="password"
                        value={formData.passwordPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="id">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit("patientId");
                  }}
                >
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patientId">ID пациента</Label>
                      <Input
                        id="patientId"
                        placeholder="Введите ID пациента"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="passwordId">Пароль</Label>
                      <Input
                        id="passwordId"
                        type="password"
                        value={formData.passwordId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full mb-4"
              onClick={() => {
                const activeTab =
                  document
                    .querySelector('[role="tabpanel"]:not([hidden])')
                    ?.getAttribute("data-state") === "active"
                    ? document
                        .querySelector('[role="tabpanel"]:not([hidden])')
                        ?.getAttribute("data-value")
                    : "email";

                if (activeTab === "email") handleSubmit("email");
                else if (activeTab === "phone") handleSubmit("phone");
                else handleSubmit("patientId");
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </Button>
            <div className="text-sm text-center text-gray-500">
              <Link href="#" className="text-blue-600 hover:underline">
                Забыли пароль?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
