import { test, expect } from "@playwright/test";

test.skip("Dashboard - Elementos como textos y botones", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  // Completar el formulario de inicio de sesión
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("testuser@example.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña" })
    .fill("hashedpassword123");

  // Hacer clic en el botón de inicio de sesión
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  // Verificar la visibilidad de los enlaces y botones en el dashboard
  await expect(page.getByRole("link", { name: "MediCitas" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Mis Turnos" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Reservar Turno" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Mi Perfil" })).toBeVisible();

  // Verificar encabezados y textos en el dashboard
  await expect(page.getByRole("heading", { name: "Mis Turnos" })).toBeVisible();
  await expect(page.getByText("No tienes turnos reservados")).toBeVisible();

  // Verificar botones en el dashboard
  await expect(
    page.getByRole("button", { name: "Reservar un turno" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Reservar nuevo turno" })
  ).toBeVisible();

  // Verificar saludo y botón de salida
  await expect(page.getByText("Hola, Test User")).toBeVisible();
  await expect(page.getByRole("button", { name: "Salir" })).toBeVisible();
});
