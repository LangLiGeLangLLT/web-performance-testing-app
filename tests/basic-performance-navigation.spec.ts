import { test } from '@playwright/test'

test('basic performance navigation', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const navigationTiming = await page.evaluate(() =>
    performance.getEntriesByType('navigation')
  )

  console.log(navigationTiming)
})
