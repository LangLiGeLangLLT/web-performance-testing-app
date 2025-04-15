import { test } from '@playwright/test'

test('Resource', async ({ page }) => {
  await page.goto('https://www.baidu.com/', { waitUntil: 'networkidle' })

  const resourceTiming = await page.evaluate(() =>
    window.performance.getEntriesByType('resource')
  )

  const logoResourceTiming = resourceTiming.find((element: any) =>
    element.name.includes('.png')
  )

  console.log(logoResourceTiming)
})
