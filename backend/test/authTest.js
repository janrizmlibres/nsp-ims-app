import { expect, test } from 'vitest'

test('testing successful login', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.fill('input[name="username"]', 'admin')
  await page.fill('input[name="password"]', 'password')
  await page.click('text=Login')
  await page.waitForNavigation()
  expect(page.url()).toBe('http://localhost:3000/dashboard')
})

test('testing failed login', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.fill('input[name="username"]', 'admin')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('text=Login')
    await page.waitForSelector('text=Invalid username or password')
    expect(page.url()).toBe('http://localhost:3000/login')
})