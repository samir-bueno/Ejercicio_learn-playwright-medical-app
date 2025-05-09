import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  // Crear especialidades si no existen
  const existingSpecialties = await prisma.specialty.findMany();
  if (existingSpecialties.length === 0) {
    await prisma.specialty.createMany({
      data: [
        { id: "cardiologia", name: "Cardiología" },
        { id: "dermatologia", name: "Dermatología" },
        { id: "pediatria", name: "Pediatría" },
      ],
    });
    console.log("Especialidades creadas");
  } else {
    console.log("Especialidades ya existen, omitiendo");
  }

  // Crear doctores si no existen
  const existingDoctors = await prisma.doctor.findMany();
  if (existingDoctors.length === 0) {
    await prisma.doctor.createMany({
      data: [
        // Cardiología
        {
          id: "dr-carlos-gomez",
          name: "Dr. Carlos Gómez",
          specialtyId: "cardiologia",
        },
        {
          id: "dra-sofia-fernandez",
          name: "Dra. Sofía Fernández",
          specialtyId: "cardiologia",
        },
        // Dermatología
        {
          id: "dra-laura-mendez",
          name: "Dra. Laura Méndez",
          specialtyId: "dermatologia",
        },
        {
          id: "dr-juan-sanchez",
          name: "Dr. Juan Sánchez",
          specialtyId: "dermatologia",
        },
        // Pediatría
        {
          id: "dr-pablo-rojas",
          name: "Dr. Pablo Rojas",
          specialtyId: "pediatria",
        },
        {
          id: "dra-ana-lopez",
          name: "Dra. Ana López",
          specialtyId: "pediatria",
        },
      ],
    });
    console.log("Doctores creados");
  } else {
    console.log("Doctores ya existen, omitiendo");
  }
}

seedDatabase()
  .then(() => {
    console.log("✅ Base de datos inicializada con datos por defecto");
  })
  .catch((err) => {
    console.error("❌ Error al inicializar la base de datos", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });