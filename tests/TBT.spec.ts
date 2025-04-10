import { test } from '@playwright/test'

test('TBT', async ({ page }) => {
  await page.goto('https://www.baidu.com/')

  const totalBlockingTime = await page.evaluate(() => {
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

      setTimeout(() => {
        resolve(totalBlockingTime)
        observer.disconnect()
      }, 5000)
    })
  })

  console.log(totalBlockingTime)
})
