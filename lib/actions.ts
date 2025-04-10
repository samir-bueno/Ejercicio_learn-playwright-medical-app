"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Simulación de base de datos
const users: any[] = []
const appointments: any[] = []
const specialties = [
  { id: "dermatologia", name: "Dermatología" },
  { id: "cardiologia", name: "Cardiología" },
  { id: "pediatria", name: "Pediatría" },
  { id: "traumatologia", name: "Traumatología" },
]
const doctors = [
  { id: "doc1", name: "María García", specialtyId: "dermatologia" },
  { id: "doc2", name: "Juan Pérez", specialtyId: "cardiologia" },
  { id: "doc3", name: "Ana Rodríguez", specialtyId: "pediatria" },
  { id: "doc4", name: "Carlos López", specialtyId: "traumatologia" },
]

// Función para generar horarios disponibles (simulación)
function generateTimeSlots(doctorId: string, date: Date) {
  // Simulamos que algunos horarios ya están ocupados
  const bookedSlots = appointments
    .filter((a) => a.doctorId === doctorId && new Date(a.date).toDateString() === date.toDateString())
    .map((a) => a.time)

  const allSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  return allSlots.filter((slot) => !bookedSlots.includes(slot))
}

// Acciones del servidor
export async function registerUser(userData: {
  name: string
  email: string
  phone: string
  password: string
}) {
  // Simulamos la creación de un usuario
  const id = `user${users.length + 1}`
  const newUser = { id, ...userData }
  users.push(newUser)

  return { success: true }
}

export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  // Simulamos la autenticación
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Credenciales inválidas")
  }

  // Simulamos la creación de una sesión
  cookies().set(
    "session",
    JSON.stringify({
      userId: user.id,
      name: user.name,
      email: user.email,
    }),
  )

  return { success: true }
}

export async function logoutUser() {
  cookies().delete("session")
  redirect("/login")
}

export async function getSpecialties() {
  return specialties
}

export async function getDoctorsBySpecialty(specialtyId: string) {
  return doctors.filter((d) => d.specialtyId === specialtyId)
}

export async function getAvailableTimeSlots(doctorId: string, date: Date) {
  return generateTimeSlots(doctorId, date)
}

export async function createAppointment(data: {
  specialty: string
  doctorId: string
  date: Date
  timeSlot: string
}) {
  const session = JSON.parse(cookies().get("session")?.value || "{}")
  if (!session.userId) {
    throw new Error("No autenticado")
  }

  // Verificar que el usuario no tenga otra cita en el mismo horario
  const existingAppointment = appointments.find(
    (a) =>
      a.userId === session.userId &&
      new Date(a.date).toDateString() === data.date.toDateString() &&
      a.time === data.timeSlot,
  )

  if (existingAppointment) {
    throw new Error("Ya tienes un turno reservado en este horario. Cancela el turno existente para reservar uno nuevo.")
  }

  // Verificar que el horario esté disponible
  const availableSlots = generateTimeSlots(data.doctorId, data.date)
  if (!availableSlots.includes(data.timeSlot)) {
    throw new Error("El horario seleccionado ya no está disponible")
  }

  // Crear la cita
  const doctor = doctors.find((d) => d.id === data.doctorId)
  const specialty = specialties.find((s) => s.id === data.specialty)

  const id = `app${appointments.length + 1}`
  const newAppointment = {
    id,
    userId: session.userId,
    doctorId: data.doctorId,
    doctorName: doctor?.name || "",
    specialty: specialty?.name || "",
    date: data.date,
    time: data.timeSlot,
    createdAt: new Date(),
  }

  appointments.push(newAppointment)
  revalidatePath("/dashboard")

  return { success: true }
}

export async function getUserAppointments() {
  const session = JSON.parse(cookies().get("session")?.value || "{}")
  if (!session.userId) {
    return []
  }

  return appointments
    .filter((a) => a.userId === session.userId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function cancelAppointment(appointmentId: string) {
  const session = JSON.parse(cookies().get("session")?.value || "{}")
  if (!session.userId) {
    throw new Error("No autenticado")
  }

  const appointmentIndex = appointments.findIndex((a) => a.id === appointmentId && a.userId === session.userId)

  if (appointmentIndex === -1) {
    throw new Error("Turno no encontrado")
  }

  // Verificar que la cita sea cancelable (más de 24 horas antes)
  const appointment = appointments[appointmentIndex]
  const appointmentDate = new Date(appointment.date)
  appointmentDate.setHours(
    Number.parseInt(appointment.time.split(":")[0]),
    Number.parseInt(appointment.time.split(":")[1]),
  )

  const now = new Date()
  const diffInHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    throw new Error("No se puede cancelar un turno con menos de 24 horas de anticipación")
  }

  // Eliminar la cita
  appointments.splice(appointmentIndex, 1)
  revalidatePath("/dashboard")

  return { success: true }
}

