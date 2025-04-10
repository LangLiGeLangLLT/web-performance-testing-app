import { test } from '@playwright/test'

test('measure core web vitals', async ({ page }) => {
  await page.addInitScript(`
    (function() {
      const metrics = [];
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          metrics.push({
            name: entry.name,
            entryType: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration,
            ...entry.toJSON()
          });
        });
      });
      
      // 监听关键指标
      observer.observe({ type: 'resource', buffered: true });
      observer.observe({ type: 'paint', buffered: true });
      observer.observe({ type: 'longtask', buffered: true });

      window.webVitalsMetrics = metrics;
    })();
  `)

  await page.goto('http://localhost:3000/')

  // 等待一段时间确保数据收集
  await page.waitForTimeout(5000)

  // 获取结果
  const metrics = await page.evaluate(() => (window as any).webVitalsMetrics)
  console.log(metrics)
})
