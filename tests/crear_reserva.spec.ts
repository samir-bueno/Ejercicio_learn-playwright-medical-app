import { test, expect } from "@playwright/test";

test("Dado un usuario, registrado, se crea una nueva reserva", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("testuser@example.com");
  await page.getByRole("textbox", { name: "Contraseña" }).click();
  await page
    .getByRole("textbox", { name: "Contraseña" })
    .fill("hashedpassword123");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "Reservar nuevo turno" }).click();
  await page.getByRole("combobox", { name: "Especialidad" }).click();
  await page.getByRole("option", { name: "Cardiología" }).click();
  await page.getByRole("combobox", { name: "Médico" }).click();
  await page.getByRole("option", { name: "Dr. Carlos Gómez" }).click();
  await page.getByRole("button", { name: "Fecha" }).click();
  await page.getByRole("button", { name: "Wednesday, May 28th," }).click();
  await page.getByRole("combobox", { name: "Horario" }).click();
  await page.getByRole("option", { name: "16:00" }).click();
  await page.getByRole("button", { name: "Reservar turno" }).click();
  await expect(page.getByText("CardiologíaDr. Carlos Gómez28")).toBeVisible();
});
