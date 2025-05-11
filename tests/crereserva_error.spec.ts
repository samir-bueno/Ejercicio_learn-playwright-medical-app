import { test, expect } from '@playwright/test';

test('muestra errores si no se completan los campos de reserva', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('testuser@example.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('hashedpassword123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await page.getByRole('button', { name: 'Reservar un turno' }).click();
  await page.getByRole('button', { name: 'Reservar turno' }).click();

  await expect(page.getByText('Seleccione una especialidad')).toBeVisible();
  await expect(page.getByText('Seleccione un médico')).toBeVisible();
  await expect(page.getByText('Seleccione una fecha')).toBeVisible();
  await expect(page.getByText('Seleccione un horario')).toBeVisible();
});
