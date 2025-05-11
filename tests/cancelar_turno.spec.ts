import { test, expect } from '@playwright/test';

test('Salir o cerrar sesion por parte del usuario', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('citapaciente@example.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('passwordcita123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByRole('button', { name: 'Cancelar turno' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancelar turno' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('main').click();
  await page.getByText('No tienes turnos reservados').click();
});