import { test, expect } from '@playwright/test';

test('muestra errores si no se ingresan datos al iniciar sesión', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByText('EmailIngrese un email válidoContraseñaLa contraseña es requeridaIniciar sesión').click();
  await expect(page.getByText('Ingrese un email válido')).toBeVisible();
  await expect(page.getByText('La contraseña es requerida')).toBeVisible();
});
