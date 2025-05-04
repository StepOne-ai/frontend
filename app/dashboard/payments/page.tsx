"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PaymentsPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const isMobile = useIsMobile();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Имитация обработки платежа
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus("success");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Оплата</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Оплата услуг и управление платежами
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-xl">Оплата услуг</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Выберите способ оплаты и введите данные
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentStatus === "idle" ? (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">
                        Выберите способ оплаты
                      </h3>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label
                            htmlFor="payment-card"
                            className="flex items-center text-sm md:text-base"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Банковская карта
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sbp" id="payment-sbp" />
                          <Label
                            htmlFor="payment-sbp"
                            className="text-sm md:text-base"
                          >
                            Система быстрых платежей (СБП)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-3 md:space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                          <div className="space-y-1 md:space-y-2">
                            <Label
                              htmlFor="card-number"
                              className="text-sm md:text-base"
                            >
                              Номер карты
                            </Label>
                            <Input
                              id="card-number"
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) =>
                                setCardNumber(formatCardNumber(e.target.value))
                              }
                              maxLength={19}
                              className="text-sm md:text-base h-9 md:h-10"
                            />
                          </div>

                          <div className="space-y-1 md:space-y-2">
                            <Label
                              htmlFor="card-name"
                              className="text-sm md:text-base"
                            >
                              Имя владельца карты
                            </Label>
                            <Input
                              id="card-name"
                              placeholder="IVAN PETROV"
                              value={cardName}
                              onChange={(e) =>
                                setCardName(e.target.value.toUpperCase())
                              }
                              className="text-sm md:text-base h-9 md:h-10"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1 md:space-y-2">
                              <Label
                                htmlFor="card-expiry"
                                className="text-sm md:text-base"
                              >
                                Срок действия
                              </Label>
                              <Input
                                id="card-expiry"
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) =>
                                  setCardExpiry(formatExpiry(e.target.value))
                                }
                                maxLength={5}
                                className="text-sm md:text-base h-9 md:h-10"
                              />
                            </div>

                            <div className="space-y-1 md:space-y-2">
                              <Label
                                htmlFor="card-cvc"
                                className="text-sm md:text-base"
                              >
                                CVC/CVV
                              </Label>
                              <Input
                                id="card-cvc"
                                placeholder="123"
                                value={cardCvc}
                                onChange={(e) =>
                                  setCardCvc(
                                    e.target.value.replace(/[^0-9]/g, ""),
                                  )
                                }
                                maxLength={3}
                                type="password"
                                className="text-sm md:text-base h-9 md:h-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "sbp" && (
                      <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs md:text-sm text-gray-700">
                          Для оплаты через Систему быстрых платежей (СБП)
                          нажмите кнопку &quot; Оплатить &quot;. Вы будете
                          перенаправлены на страницу оплаты, где сможете выбрать
                          свой банк и завершить платеж.
                        </p>
                      </div>
                    )}

                    <div className="pt-3 md:pt-4 border-t">
                      <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">
                        Сумма к оплате
                      </h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">
                            Оплата за ортодонтическое лечение (четвертый взнос)
                          </p>
                        </div>
                        <div className="text-lg md:text-xl font-bold">
                          50 000 ₽
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-sm md:text-base"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Обработка платежа..." : "Оплатить"}
                    </Button>
                  </div>
                </form>
              ) : paymentStatus === "success" ? (
                <div className="text-center py-6 md:py-8">
                  <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                    Платеж успешно выполнен!
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    Ваш платеж на сумму 50 000 ₽ успешно обработан.
                  </p>

                  <Button
                    onClick={() => setPaymentStatus("idle")}
                    className="mx-auto text-sm md:text-base"
                  >
                    Вернуться к оплате
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 md:py-8">
                  <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                    Ошибка платежа
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    К сожалению, произошла ошибка при обработке платежа.
                    Пожалуйста, попробуйте еще раз.
                  </p>
                  <Button
                    onClick={() => setPaymentStatus("idle")}
                    className="mx-auto text-sm md:text-base"
                  >
                    Попробовать снова
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-xl">
                Информация о платежах
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Сводка по вашим платежам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="font-medium text-sm md:text-base">
                    Общая стоимость лечения
                  </h3>
                  <p className="text-xl md:text-2xl font-bold">200 000 ₽</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      Оплачено
                    </h3>
                  </div>
                  <div className="text-green-600 font-bold text-base md:text-lg">
                    150 000 ₽
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      Осталось оплатить
                    </h3>
                  </div>
                  <div className="text-amber-600 font-bold text-base md:text-lg">
                    50 000 ₽
                  </div>
                </div>

                <div className="pt-3 md:pt-4 border-t">
                  <h3 className="font-medium mb-2 text-sm md:text-base">
                    График платежей
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-xs md:text-sm">
                        Первый взнос (01.02.2023)
                      </div>
                      <div className="text-xs md:text-sm font-medium text-green-600">
                        Оплачено
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs md:text-sm">
                        Второй взнос (01.03.2023)
                      </div>
                      <div className="text-xs md:text-sm font-medium text-green-600">
                        Оплачено
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs md:text-sm">
                        Третий взнос (01.04.2023)
                      </div>
                      <div className="text-xs md:text-sm font-medium text-green-600">
                        Оплачено
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs md:text-sm">
                        Четвертый взнос (01.05.2023)
                      </div>
                      <div className="text-xs md:text-sm font-medium text-amber-600">
                        Ожидается
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-xs md:text-sm">
                История платежей
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-lg md:text-xl">История платежей</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Все ваши платежи за лечение
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                Все платежи
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">
                Оплаченные
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs md:text-sm">
                Ожидающие
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-3 md:mt-4">
              {isMobile ? (
                <div className="space-y-3">
                  <MobilePaymentCard
                    date="01.02.2023"
                    description="Оплата за ортодонтическое лечение (первый взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                  <MobilePaymentCard
                    date="01.03.2023"
                    description="Оплата за ортодонтическое лечение (второй взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                  <MobilePaymentCard
                    date="01.04.2023"
                    description="Оплата за ортодонтическое лечение (третий взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                  <MobilePaymentCard
                    date="01.05.2023"
                    description="Оплата за ортодонтическое лечение (четвертый взнос)"
                    amount="50 000 ₽"
                    status="pending"
                  />
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Описание
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Сумма
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <PaymentRow
                        date="01.02.2023"
                        description="Оплата за ортодонтическое лечение (первый взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                      <PaymentRow
                        date="01.03.2023"
                        description="Оплата за ортодонтическое лечение (второй взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                      <PaymentRow
                        date="01.04.2023"
                        description="Оплата за ортодонтическое лечение (третий взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                      <PaymentRow
                        date="01.05.2023"
                        description="Оплата за ортодонтическое лечение (четвертый взнос)"
                        amount="50 000 ₽"
                        status="pending"
                      />
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-3 md:mt-4">
              {isMobile ? (
                <div className="space-y-3">
                  <MobilePaymentCard
                    date="01.02.2023"
                    description="Оплата за ортодонтическое лечение (первый взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                  <MobilePaymentCard
                    date="01.03.2023"
                    description="Оплата за ортодонтическое лечение (второй взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                  <MobilePaymentCard
                    date="01.04.2023"
                    description="Оплата за ортодонтическое лечение (третий взнос)"
                    amount="50 000 ₽"
                    status="paid"
                  />
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Описание
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Сумма
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <PaymentRow
                        date="01.02.2023"
                        description="Оплата за ортодонтическое лечение (первый взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                      <PaymentRow
                        date="01.03.2023"
                        description="Оплата за ортодонтическое лечение (второй взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                      <PaymentRow
                        date="01.04.2023"
                        description="Оплата за ортодонтическое лечение (третий взнос)"
                        amount="50 000 ₽"
                        status="paid"
                      />
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="mt-3 md:mt-4">
              {isMobile ? (
                <div className="space-y-3">
                  <MobilePaymentCard
                    date="01.05.2023"
                    description="Оплата за ортодонтическое лечение (четвертый взнос)"
                    amount="50 000 ₽"
                    status="pending"
                  />
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Описание
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Сумма
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <PaymentRow
                        date="01.05.2023"
                        description="Оплата за ортодонтическое лечение (четвертый взнос)"
                        amount="50 000 ₽"
                        status="pending"
                      />
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface PaymentRowProps {
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

function PaymentRow({ date, description, amount, status }: PaymentRowProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Оплачено
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Ожидается
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Ошибка
          </span>
        );
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge()}</td>
    </tr>
  );
}

function MobilePaymentCard({
  date,
  description,
  amount,
  status,
}: PaymentRowProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Оплачено
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Ожидается
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Ошибка
          </span>
        );
    }
  };

  return (
    <div className="border rounded-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <div className="text-xs text-gray-500">{date}</div>
        <div>{getStatusBadge()}</div>
      </div>
      <div className="text-sm font-medium mb-2">{description}</div>
      <div className="text-sm font-bold">{amount}</div>
    </div>
  );
}
