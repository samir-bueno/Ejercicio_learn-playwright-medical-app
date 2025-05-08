"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import globalSetup from "../tests/utils/global-setup"; // Mantener el nombre original de la función

const prisma = new PrismaClient();

// Inserta los datos de prueba al iniciar el servidor
globalSetup()
  .then(() => {
    console.log("Datos de prueba insertados correctamente.");
  })
  .catch((error) => {
    console.error("Error al insertar datos de prueba:", error);
  });

// Acciones del servidor
export async function registerUser(userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new Error("El usuario ya está registrado.");
  }

  // Crear un nuevo usuario
  const newUser = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // En una implementación real, debes encriptar la contraseña
    },
  });

  console.log("Nuevo usuario creado:", newUser);

  return { success: true };
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Verificar las credenciales del usuario
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || user.password !== password) {
    throw new Error("Credenciales inválidas");
  }

  // Crear sesión
  (await cookies()).set(
    "session",
    JSON.stringify({
      userId: user.id,
      name: user.name,
      email: user.email,
    })
  );

  return { success: true };
}

export async function logoutUser() {
  (await cookies()).delete("session");
  redirect("/login");
}

export async function getSpecialties() {
  return await prisma.specialty.findMany();
}

export async function getDoctorsBySpecialty(specialtyId: string) {
  return await prisma.doctor.findMany({
    where: {
      specialtyId: specialtyId,
    },
  });
}

export async function getAvailableTimeSlots(doctorId: string, date: Date) {
  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      date: date,
    },
  });

  const bookedSlots = appointments.map((a: { time: string }) => a.time);

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
  ];

  return allSlots.filter((slot) => !bookedSlots.includes(slot));
}

export async function createAppointment(data: {
  specialty: string;
  doctorId: string;
  date: Date;
  timeSlot: string;
}) {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    throw new Error("No autenticado");
  }

  // Verificar si ya hay un turno reservado en el mismo horario
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      userId: session.userId,
      doctorId: data.doctorId,
      date: data.date,
      time: data.timeSlot,
    },
  });

  if (existingAppointment) {
    throw new Error(
      "Ya tienes un turno reservado en este horario. Cancela el turno existente para reservar uno nuevo."
    );
  }

  // Verificar si el horario está disponible
  const availableSlots = await getAvailableTimeSlots(data.doctorId, data.date);
  if (!availableSlots.includes(data.timeSlot)) {
    throw new Error("El horario seleccionado ya no está disponible");
  }

  const doctor = await prisma.doctor.findUnique({
    where: { id: data.doctorId },
  });
  const specialty = await prisma.specialty.findUnique({
    where: { id: data.specialty },
  });

  const newAppointment = await prisma.appointment.create({
    data: {
      userId: session.userId,
      doctorId: data.doctorId,
      date: data.date,
      time: data.timeSlot,
      doctorName: doctor?.name || "",
      specialtyName: specialty?.name || "",
      createdAt: new Date(),
    },
  });

  revalidatePath("/dashboard");

  return { success: true };
}

export async function getUserAppointments() {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    return [];
  }

  return await prisma.appointment.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function cancelAppointment(appointmentId: string) {
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    throw new Error("No autenticado");
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment || appointment.userId !== session.userId) {
    throw new Error("Turno no encontrado");
  }

  const appointmentDate = new Date(appointment.date);
  appointmentDate.setHours(
    Number.parseInt(appointment.time.split(":")[0]),
    Number.parseInt(appointment.time.split(":")[1])
  );

  const now = new Date();
  const diffInHours =
    (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    throw new Error(
      "No se puede cancelar un turno con menos de 24 horas de anticipación"
    );
  }

  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  revalidatePath("/dashboard");

  return { success: true };
}
