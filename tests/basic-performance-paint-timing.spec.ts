import { test } from '@playwright/test'

test('basic performance paint timing', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const paintTiming = await page.evaluate(() =>
    window.performance.getEntriesByType('paint')
  )
  console.log(paintTiming)
})
