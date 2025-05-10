"use client"

import { useEffect, useState } from "react"
import { getUserAppointments } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { CancelAppointmentButton } from "@/components/cancel-appointment-button"

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getUserAppointments()
      setAppointments(data)
      setLoading(false)
    }

    fetchAppointments()
  }, [])

  const handleCancel = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Turnos</h1>
        <Link href="/dashboard/reservar">
          <Button>Reservar nuevo turno</Button>
        </Link>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No tienes turnos reservados</p>
              <Link href="/dashboard/reservar">
                <Button>Reservar un turno</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{appointment.specialty?.name}</CardTitle>
                <CardDescription>{appointment.doctor?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{appointment.time}</span>
                  </div>

                  <CancelAppointmentButton
                    appointmentId={appointment.id}
                    appointmentDate={appointment.date}
                    onCancel={() => handleCancel(appointment.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}