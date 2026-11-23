import { expect, test } from '@playwright/test'

test.describe('public pages', () => {
  test('home renders live featured courses', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Shikhor Academy/)
    await expect(page.getByRole('heading', { name: 'Featured courses' })).toBeVisible()
    await expect(page.locator('a[href="/courses/complete-web-development-bootcamp"]').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Shikhor Academy home' })).toBeVisible()
  })

  test('course catalogue and detail show curriculum and instructor', async ({ page }) => {
    await page.goto('/courses')
    await expect(page.getByRole('heading', { name: 'Find your next course' })).toBeVisible()

    await page.locator('a[href="/courses/complete-web-development-bootcamp"]').first().click()

    await expect(page).toHaveURL(/\/courses\/complete-web-development-bootcamp$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Complete Web Development Bootcamp' })).toBeVisible()
    await expect(page.getByText('Taught by')).toBeVisible()
    await expect(page.getByRole('link', { name: /Arif Chowdhury/ }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About this course' })).toBeVisible()
    await expect(page.getByText('Getting Started').first()).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible()
  })

  test('store product, blog article and instructor profile render', async ({ page }) => {
    await page.goto('/store')
    await expect(page.getByRole('heading', { name: 'Shikhor Store' })).toBeVisible()
    await page.locator('a[href="/store/hoco-hc2-wireless-bluetooth-speaker"]').first().click()
    await expect(page.getByRole('heading', { level: 1, name: 'HOCO HC2 Wireless Bluetooth Speaker' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible()

    await page.goto('/blog')
    await expect(page.getByRole('heading', { name: 'Learning notes' })).toBeVisible()
    await page.locator('a[href="/blog/5-habits-of-highly-effective-online-learners"]').first().click()
    await expect(page.getByRole('heading', { level: 1, name: '5 Habits of Highly Effective Online Learners' })).toBeVisible()
    await expect(page.getByText(/Online learning rewards/i).first()).toBeVisible()

    await page.goto('/instructors')
    await expect(page.getByRole('heading', { name: 'Learn from our instructors' })).toBeVisible()
    await page.goto('/instructors/8')
    await expect(page.getByRole('heading', { level: 1, name: 'Arif Chowdhury' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Courses by Arif Chowdhury' })).toBeVisible()
    await expect(page.getByText('Senior full-stack engineer & Laravel educator')).toBeVisible()
  })

  test('unknown routes render the 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: 'We could not find that page' })).toBeVisible()
  })

  test('protected pages redirect anonymous visitors to login', async ({ page }) => {
    await page.goto('/my-courses')
    await expect(page).toHaveURL(/\/login\?next=/)
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })
})
