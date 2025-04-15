import { test } from '@playwright/test'

test('FCP', async ({ page }) => {
  await page.goto('https://www.baidu.com/', { waitUntil: 'networkidle' })

  const paintTiming = await page.evaluate(() =>
    window.performance.getEntriesByType('paint')
  )

  console.log(paintTiming)
})
