import { test, expect } from '@playwright/test';

test('Creacion de una reserva con los datos necesarios', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('usuario@example.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('usuario123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Reservar un turno' }).click();
  await page.getByRole('combobox', { name: 'Especialidad' }).click();
  await page.getByRole('option', { name: 'Cardiología' }).click();
  await page.getByRole('combobox', { name: 'Médico' }).click();
  await page.getByRole('option', { name: 'Dr. Carlos Gómez' }).click();
  await page.getByRole('button', { name: 'Fecha' }).click();
  await page.getByRole('button', { name: 'Tuesday, May 27th,' }).click();
  await page.getByRole('combobox', { name: 'Horario' }).click();
  await page.getByRole('option', { name: '16:00' }).click();
  await page.getByRole('button', { name: 'Reservar turno' }).click();
  await Promise.all([
    page.waitForURL('**/dashboard'),
    page.getByRole('button', { name: 'Reservar turno' }).click(),
  ]);

  // Confirmar que estamos en el dashboard (por ejemplo, sección 'Mis Turnos')
  await expect(page.getByRole('heading', { name: 'Mis Turnos' })).toBeVisible();
});