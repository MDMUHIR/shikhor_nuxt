import { mkdirSync } from 'node:fs'
import { expect, test as setup } from '@playwright/test'

const authDir = 'tests/.auth'
mkdirSync(authDir, { recursive: true })

const accounts = [
  { file: 'customer.json', email: 'customer@gmail.com', password: 'customer', type: 'customer' },
  { file: 'admin.json', email: 'admin@gmail.com', password: 'admin', type: 'admin' },
]

for (const account of accounts) {
  setup(`authenticate ${account.type}`, async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: account.email, password: account.password },
    })

    expect(response.ok(), `login failed for ${account.email}`).toBeTruthy()
    const body = await response.json()
    expect(body.user?.email).toBe(account.email)

    await request.storageState({ path: `${authDir}/${account.file}` })
  })
}
