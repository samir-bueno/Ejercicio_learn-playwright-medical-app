import { test, expect } from "@playwright/test";

test("muestra errores de validación si no se completan todos los campos", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/register");
  await page.getByRole("button", { name: "Registrarse" }).click();
  await expect(page.getByText("El nombre debe tener al menos")).toBeVisible();
  await expect(page.getByText("Ingrese un email válido")).toBeVisible();
  await expect(page.getByText("Ingrese un número de teléfono")).toBeVisible();
  await expect(page.getByText("La contraseña debe tener al")).toBeVisible();
});
