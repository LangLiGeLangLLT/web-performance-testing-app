import { test } from '@playwright/test'

test('basic performance resource', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const resourceTiming = await page.evaluate(() =>
    window.performance.getEntriesByType('resource')
  )

  const logoResourceTiming = resourceTiming.find((element: any) =>
    element.name.includes('.png')
  )

  console.log(logoResourceTiming)
})
