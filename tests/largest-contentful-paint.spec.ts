import { test } from '@playwright/test'

test('basic performance largest contentful paint', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const largestContentfulPaint: string = await page.evaluate(() => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((l) => {
        const entries = l.getEntries()
        // the last entry is the largest contentful paint
        const largestPaintEntry = entries.at(-1)
        resolve(`${largestPaintEntry?.startTime}`)
        observer.disconnect()
      })

      observer.observe({
        type: 'largest-contentful-paint',
        buffered: true,
      })
    })
  })

  console.log(parseFloat(largestContentfulPaint)) // 1139.39
})
