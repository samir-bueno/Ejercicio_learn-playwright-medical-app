import { test, expect } from "@playwright/test";

test("registro exitoso", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.getByRole("textbox", { name: "Nombre completo" }).fill("ejemplo");
  await page.getByRole("textbox", { name: "Email" }).fill("ejemplo@gmail.com");
  await page.getByRole("textbox", { name: "Teléfono" }).fill("1234567899");
  await page
    .getByRole("textbox", { name: "Contraseña", exact: true })
    .fill("ejemplo123");
  await page
    .getByRole("textbox", { name: "Confirmar contraseña" })
    .fill("ejemplo123");
  await page.getByRole("button", { name: "Registrarse" }).click();

  // Esperar a que aparezca el título de "Iniciar sesión"
  await expect(
    page.getByRole("heading", { name: "Iniciar sesión" })
  ).toBeVisible();
});
