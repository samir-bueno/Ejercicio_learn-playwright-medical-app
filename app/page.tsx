import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarClock, ClipboardCheck, UserCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarClock className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold text-teal-600">MediCitas</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-teal-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Reserva tu turno médico en línea</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Accede a los mejores especialistas de forma rápida y segura, sin necesidad de llamadas telefónicas.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Regístrate</h3>
                <p className="text-gray-600">Crea tu cuenta con tus datos personales para acceder al sistema.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarClock className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Reserva</h3>
                <p className="text-gray-600">Selecciona especialidad, médico y horario que mejor se adapte a ti.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Confirma</h3>
                <p className="text-gray-600">Recibe la confirmación por email y gestiona tus citas desde tu perfil.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 MediCitas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

