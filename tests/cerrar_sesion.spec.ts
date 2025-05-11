import { test, expect } from '@playwright/test';

test('cerrar sesión redirige al login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Ingresar credenciales
  await page.getByRole('textbox', { name: 'Email' }).fill('testuser@example.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('hashedpassword123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // Hacer clic en "Salir"
  await page.getByRole('button', { name: 'Salir' }).click();

  // Verificar redirección al login
  await expect(page).toHaveURL(/.*login/);
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
});
