import { prisma } from "../../lib/prisma";

async function globalTeardown() {
  console.log("Ejecutando globalTeardown: Limpiando entorno de pruebas...");

  // Elimina los datos de los modelos relacionados
  await prisma.appointment.deleteMany(); // Elimina todas las citas
  await prisma.doctor.deleteMany(); // Elimina todos los doctores
  await prisma.specialty.deleteMany(); // Elimina todas las especialidades
  await prisma.user.deleteMany(); // Elimina todos los usuarios

  console.log("Datos de prueba eliminados correctamente.");
}

export default globalTeardown;