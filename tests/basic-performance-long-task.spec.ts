import { test } from '@playwright/test'

test('basic performance long task', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const totalBlockingTime: number = await page.evaluate(() => {
    return new Promise<number>((resolve) => {
      let totalBlockingTime = 0
      const observer = new PerformanceObserver(function (list) {
        const perfEntries = list.getEntries()
        for (const perfEntry of perfEntries) {
          totalBlockingTime += perfEntry.duration - 50
        }
        resolve(totalBlockingTime)
        observer.disconnect()
      })

      observer.observe({ type: 'longtask', buffered: true })

      // Resolve promise if there haven't been long tasks
      setTimeout(() => {
        resolve(totalBlockingTime)
        observer.disconnect()
      }, 5000)
    })
  }, 0)

  console.log(parseFloat(totalBlockingTime.toString())) // 0
})
