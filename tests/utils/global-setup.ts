// tests/utils/global-setup.ts
import { prisma } from "../../lib/prisma";

async function globalSetup() {
  console.log("🚀 Ejecutando globalSetup: Inicializando entorno de pruebas...");

  // Limpieza: borra primero las citas, luego doctores, usuarios y especialidades
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialty.deleteMany();

  // Crear especialidades
  const cardio = await prisma.specialty.create({
    data: { id: "cardio", name: "Cardiología" },
  });
  const derma = await prisma.specialty.create({
    data: { id: "derma", name: "Dermatología" },
  });
  const neuro = await prisma.specialty.create({
    data: { id: "neuro", name: "Neurología" },
  });

  // Crear doctores
  const doctor1 = await prisma.doctor.create({
    data: { id: "doc1", name: "Dr. Jorge Pérez", specialtyId: cardio.id },
  });

  const doctor2 = await prisma.doctor.create({
    data: { id: "doc2", name: "Dra. Ana Torres", specialtyId: derma.id },
  });

  const doctor3 = await prisma.doctor.create({
    data: { id: "doc3", name: "Dr. Luis Gómez", specialtyId: neuro.id },
  });

  // Crear usuario de prueba
  const user = await prisma.user.create({
    data: {
      id: "user1",
      name: "Test User",
      email: "testuser@example.com",
      phone: "123456789",
      password: "hashedpassword123", // Asegúrate de usar hash real si tu app lo necesita
    },
  });

  // Opcional: crear una cita de prueba
  await prisma.appointment.create({
    data: {
      userId: user.id,
      doctorId: doctor1.id,
      specialtyId: cardio.id,
      date: new Date(), // Fecha actual
      time: "10:00",
    },
  });

  console.log("✅ Datos de prueba insertados correctamente.");
}

export default globalSetup;
