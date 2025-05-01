import type React from "react"
import DashboardClient from "./layout.client"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardClient />
      {/* Остальной код макета */}
    </>
  )
}
