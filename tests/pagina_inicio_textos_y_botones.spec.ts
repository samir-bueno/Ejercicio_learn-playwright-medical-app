import { test, expect } from '@playwright/test';

test('Inicio - Elementos como textos y botones', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verifica título principal y botones principales
  await expect(page.getByText('MediCitas', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Comenzar ahora' })).toBeVisible();

  // Secciones informativas
  await expect(page.getByRole('heading', { name: '¿Cómo funciona?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '1. Regístrate' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '2. Reserva' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Confirma' })).toBeVisible();

  // Footer
  await expect(page.locator('footer')).toContainText('© 2025 MediCitas');
});