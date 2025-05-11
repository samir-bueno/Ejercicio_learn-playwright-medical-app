import { prisma } from "../../lib/prisma";

async function globalSetup() {
  console.log("🚀 Ejecutando globalSetup: Inicializando entorno de pruebas...");

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
    data: { id: "dr-carlos-gomez", name: "Dr. Carlos Gómez", specialtyId: cardio.id },
  });

  await prisma.doctor.createMany({
    data: [
      { id: "dra-sofia-fernandez", name: "Dra. Sofía Fernández", specialtyId: cardio.id },
      { id: "dra-laura-mendez", name: "Dra. Laura Méndez", specialtyId: derma.id },
      { id: "dr-juan-sanchez", name: "Dr. Juan Sánchez", specialtyId: derma.id },
      { id: "dr-pablo-rojas", name: "Dr. Pablo Rojas", specialtyId: neuro.id },
      { id: "dra-ana-lopez", name: "Dra. Ana López", specialtyId: neuro.id },
    ],
  });

  await prisma.user.create({
    data: {
      id: "user1",
      name: "Test User",
      email: "testuser@example.com",
      phone: "123456789",
      password: "hashedpassword123",
    },
  });

  const user = await prisma.user.create({
    data: {
      id: "user2",
      name: "Cita User",
      email: "citapaciente@example.com",
      phone: "987654321",
      password: "passwordcita123",
    },
  });
  await prisma.user.create({
    data: {
      id: "user3",
      name: "usuario",
      email: "usuario@example.com",
      phone: "555555555",
      password: "usuario123",
    },
  });

  // Cita con specialtyId y fecha actual
  await prisma.appointment.create({
    data: {
      userId: user.id,
      doctorId: doctor1.id,
      specialtyId: cardio.id,
      date: new Date("2025-05-28"),
      time: "10:00",
    },
  });

  console.log("✅ Datos de prueba insertados correctamente.");
}

export default globalSetup;
