import { test } from '@playwright/test'

test('basic performance layout shift', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const cumulativeLayoutShift: string = await page.evaluate(() => {
    return new Promise((resolve) => {
      let CLS = 0

      const observer = new PerformanceObserver((l) => {
        const entries = l.getEntries()

        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            CLS += entry.value
          }
        })

        resolve(CLS.toString())
        observer.disconnect()
      })

      observer.observe({
        type: 'layout-shift',
        buffered: true,
      })

      setTimeout(() => {
        resolve('0') // 超时强制返回0
        observer.disconnect()
      }, 5000)
    })
  }, '0')

  console.log(parseFloat(cumulativeLayoutShift)) // 0.0001672498
})
