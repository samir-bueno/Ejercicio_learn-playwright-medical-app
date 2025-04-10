import type { ReactNode } from "react"
import Link from "next/link"
import { CalendarClock, Calendar, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { checkAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await checkAuth()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <CalendarClock className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">MediCitas</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:inline-block">Hola, {user.name}</span>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <nav className="p-4 space-y-1">
            <Link href="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Mis Turnos</span>
            </Link>
            <Link
              href="/dashboard/reservar"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <CalendarClock className="h-5 w-5 text-gray-500" />
              <span>Reservar Turno</span>
            </Link>
            <Link
              href="/dashboard/perfil"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-500" />
              <span>Mi Perfil</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

