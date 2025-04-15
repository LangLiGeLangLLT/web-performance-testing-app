import { test } from '@playwright/test'

test('Navigation', async ({ page }) => {
  await page.goto('https://www.baidu.com/', { waitUntil: 'networkidle' })

  const navigationTiming = await page.evaluate(() =>
    performance.getEntriesByType('navigation')
  )

  console.log(navigationTiming)
})
