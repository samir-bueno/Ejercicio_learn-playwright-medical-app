"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { cancelAppointment } from "@/lib/actions"

interface CancelAppointmentButtonProps {
  appointmentId: string
  appointmentDate: Date
  onCancel?: () => void
}

export function CancelAppointmentButton({
  appointmentId,
  appointmentDate,
  onCancel,
}: CancelAppointmentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Check if appointment is within 24 hours
  const isWithin24Hours = () => {
    const now = new Date()
    const appointmentTime = new Date(appointmentDate)
    const diffInHours = (appointmentTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffInHours < 24
  }

  const canCancel = !isWithin24Hours()

  const handleCancel = async () => {
    setIsLoading(true)
    try {
      await cancelAppointment(appointmentId)
      toast({
        title: "Turno cancelado",
        description: "Tu turno ha sido cancelado exitosamente",
      })
      setTimeout(() => {
        onCancel?.()
      }, 300)
    } catch (error) {
      toast({
        title: "Error al cancelar",
        description: "No se pudo cancelar el turno",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!canCancel) {
    return (
      <Button variant="outline" size="sm" className="w-full" disabled>
        <X className="h-4 w-4 mr-2" />
        No se puede cancelar
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <X className="h-4 w-4 mr-2" />
          Cancelar turno
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El turno será cancelado permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel} disabled={isLoading}>
            {isLoading ? "Cancelando..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}