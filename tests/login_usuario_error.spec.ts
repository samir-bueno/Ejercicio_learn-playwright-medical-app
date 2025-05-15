import { test, expect } from "@playwright/test";

test("Muestra errores si no se ingresan los datos necesarios", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page.getByText("Ingrese un email válido")).toBeVisible();
  await expect(page.getByText("La contraseña es requerida")).toBeVisible();
});
