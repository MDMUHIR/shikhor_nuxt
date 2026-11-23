import { expect, test } from '@playwright/test'

test.describe('signed-in student', () => {
  test('learning and account pages show real API data', async ({ page }) => {
    await page.goto('/my-courses')
    await expect(page.getByRole('heading', { name: 'My courses' })).toBeVisible()
    await expect(page.getByText('Complete Web Development Bootcamp')).toBeVisible()

    await page.goto('/orders')
    await expect(page.getByRole('heading', { name: 'My orders' })).toBeVisible()
    await expect(page.getByText('ORD-20261108-0003')).toBeVisible()

    await page.goto('/payments')
    await expect(page.getByRole('heading', { name: 'Payment history' })).toBeVisible()
    await expect(page.locator('a[href^="/orders/"]').first()).toBeVisible()

    await page.goto('/certificates')
    await expect(page.getByRole('heading', { name: 'My certificates' })).toBeVisible()
    await expect(page.getByText('UI/UX Design Masterclass with Figma')).toBeVisible()

    await page.goto('/notifications')
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible()
    await expect(page.getByText('Payment received')).toBeVisible()

    await page.goto('/profile')
    await expect(page.getByText('customer@gmail.com').first()).toBeVisible()
    await expect(page.getByText(/read-only/i).first()).toBeVisible()
  })

  test('adding a product or course updates the cart', async ({ page }) => {
    await page.goto('/store/hoco-hc2-wireless-bluetooth-speaker')
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await expect(page.getByText('Added to your cart.')).toBeVisible()

    await page.getByRole('link', { name: 'Cart' }).click()
    await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible()
    await expect(page.getByText('HOCO HC2 Wireless Bluetooth Speaker')).toBeVisible()

    await page.goto('/courses/python-for-data-science-and-machine-learning')
    await page.getByRole('button', { name: 'Add to cart' }).click()
    await expect(page.getByText('Added to your cart.')).toBeVisible()

    await page.getByRole('link', { name: 'Cart' }).click()
    await expect(page.getByText('Python for Data Science and Machine Learning')).toBeVisible()
  })

  test('wishlist stores and lists a product', async ({ page }) => {
    await page.goto('/store/hoco-hc2-wireless-bluetooth-speaker')

    const add = page.getByRole('button', { name: 'Add to wishlist' })
    if (await add.count()) {
      await add.click()
      await expect(page.getByText('Saved to your wishlist.')).toBeVisible()
    }

    await page.getByRole('link', { name: 'Wishlist' }).click()
    await expect(page.getByRole('heading', { name: 'Your wishlist' })).toBeVisible()
    await expect(page.getByText('HOCO HC2 Wireless Bluetooth Speaker')).toBeVisible()
  })

  test('exams, community and learn pages load', async ({ page }) => {
    await page.goto('/exams')
    await expect(page.getByRole('heading', { name: 'Exams' })).toBeVisible()
    await expect(page.getByText('Shikhor Scholarship Admission Test')).toBeVisible()

    await page.goto('/community/complete-web-development-bootcamp')
    await expect(page.getByText('Week 3 live workshop: build a REST API together')).toBeVisible()

    await page.goto('/learn/complete-web-development-bootcamp')
    await expect(page.getByText('Complete Web Development Bootcamp').first()).toBeVisible()
    await expect(page.getByText('Welcome to the bootcamp').first()).toBeVisible()
  })
})
