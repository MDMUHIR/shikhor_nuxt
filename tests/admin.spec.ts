import { expect, test } from '@playwright/test'

test.describe('admin console', () => {
  test('dashboard shows live platform data', async ({ page }) => {
    await page.goto('/admin')

    await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Recent orders' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Quick actions' })).toBeVisible()
  })

  test('course, exam, order and payment management pages load', async ({ page }) => {
    await page.goto('/admin/courses')
    await expect(page.getByRole('heading', { level: 1, name: 'Courses' })).toBeVisible()
    await expect(page.getByText('Complete Web Development Bootcamp')).toBeVisible()
    await expect(page.getByRole('link', { name: /New course/ })).toBeVisible()

    await page.goto('/admin/exams')
    await expect(page.getByRole('heading', { level: 1, name: 'Exams' })).toBeVisible()
    await expect(page.getByText('Web Development Final Exam')).toBeVisible()

    await page.goto('/admin/orders')
    await expect(page.getByRole('heading', { level: 1, name: 'Orders' })).toBeVisible()
    await expect(page.getByText('ORD-20261108-0003')).toBeVisible()

    await page.goto('/admin/payments')
    await expect(page.getByRole('heading', { level: 1, name: 'Payments' })).toBeVisible()
    await expect(page.getByText('ORD-20261108-0003')).toBeVisible()
    await expect(page.locator('tbody tr').first()).toBeVisible()
  })

  test('admin sidebar navigates between management areas', async ({ page }) => {
    await page.goto('/admin')

    await page.getByRole('navigation', { name: 'Admin' }).getByRole('link', { name: 'Enrollments' }).click()
    await expect(page).toHaveURL(/\/admin\/enrollments$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Enrollments' })).toBeVisible()

    await page.getByRole('navigation', { name: 'Admin' }).getByRole('link', { name: 'Reviews' }).click()
    await expect(page).toHaveURL(/\/admin\/reviews$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Course reviews' })).toBeVisible()
  })
})
