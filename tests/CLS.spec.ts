import { test } from '@playwright/test'

test('CLS', async ({ page }) => {
  await page.goto('https://www.baidu.com/', { waitUntil: 'networkidle' })

  const cumulativeLayoutShift = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      let CLS = 0

      const observer = new PerformanceObserver((l) => {
        const entries = l.getEntries()

        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            CLS += entry.value
          }
        })

        resolve(CLS)
        observer.disconnect()
      })

      observer.observe({
        type: 'layout-shift',
        buffered: true,
      })

      setTimeout(() => {
        resolve(0)
        observer.disconnect()
      }, 5000)
    })
  })

  console.log(cumulativeLayoutShift)
})
