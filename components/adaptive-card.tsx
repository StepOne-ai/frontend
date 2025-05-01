"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import type { ReactNode } from "react"

interface AdaptiveCardProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function AdaptiveCard({ title, description, children, footer, className }: AdaptiveCardProps) {
  const isMobile = useIsMobile()

  return (
    <Card className={className}>
      <CardHeader className={isMobile ? "pb-3" : "pb-6"}>
        <CardTitle className={isMobile ? "text-lg" : "text-xl"}>{title}</CardTitle>
        {description && <CardDescription className={isMobile ? "text-xs" : "text-sm"}>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
