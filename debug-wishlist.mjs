import { chromium, request } from '@playwright/test'

const baseURL = process.env.BASE || 'http://127.0.0.1:3000'
const api = await request.newContext({ baseURL })
const login = await api.post('/api/auth/login', { data: { email: 'customer@gmail.com', password: 'customer' } })
console.log('login', login.status(), await login.text())
const state = await api.storageState()

const wl = await api.get('/api/proxy/wishlist')
console.log('wishlist', wl.status(), (await wl.text()).slice(0, 300))

const browser = await chromium.launch()
const context = await browser.newContext({ storageState: state })
const page = await context.newPage()
page.on('console', (msg) => console.log('console:', msg.type(), msg.text()))
page.on('pageerror', (err) => console.log('pageerror:', err.message))
page.on('request', (req) => { if (req.url().includes('/api/')) console.log('REQ', req.method(), req.url(), req.postData() || '') })
page.on('response', async (res) => {
  if (res.url().includes('/api/')) {
    let body = ''
    try { body = (await res.text()).slice(0, 300) } catch {}
    console.log('RES', res.status(), res.url(), body)
  }
})

await page.goto(`${baseURL}/store/hoco-hc2-wireless-bluetooth-speaker`, { waitUntil: 'load' })
console.log('before click, __NUXT__?', await page.evaluate(() => !!window.__NUXT__))
const add = page.getByRole('button', { name: 'Add to wishlist' })
console.log('add count', await add.count())
if (await add.count()) {
  await add.click()
  await page.waitForTimeout(3000)
}
console.log('toasts:', await page.locator('[role="status"]').allTextContents())
console.log('button after:', await page.locator('button[aria-label*="wishlist"]').evaluateAll((els) => els.map((e) => e.getAttribute('aria-label'))))
console.log('url', page.url())
await browser.close()
await api.dispose()
