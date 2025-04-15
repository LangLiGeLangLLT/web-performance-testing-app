import test from '@playwright/test'
import fs from 'fs'

test('lighthouse json', async () => {
  const { launch } = await import('chrome-launcher')
  const lighthouse = await import('lighthouse')

  const chrome = await launch({
    chromeFlags: ['--headless'],
  })
  const results = await lighthouse.default(
    'https://www.baidu.com',
    {
      output: 'json',
      port: chrome.port,
      disableStorageReset: true,
    },
    {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        throttling: {
          rttMs: 30,
          throughputKbps: 100_000,
          cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        emulatedUserAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    }
  )
  fs.writeFileSync('lighthouse.json', JSON.stringify(results?.lhr, null, 2))
  await chrome.kill()
})

test('lighthouse html', async () => {
  const { launch } = await import('chrome-launcher')
  const lighthouse = await import('lighthouse')

  const chrome = await launch({
    chromeFlags: ['--headless'],
  })
  const results = await lighthouse.default(
    'https://www.baidu.com',
    {
      output: 'html',
      port: chrome.port,
      disableStorageReset: true,
    },
    {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        throttling: {
          rttMs: 30,
          throughputKbps: 100_000,
          cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        emulatedUserAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    }
  )
  fs.writeFileSync('lighthouse.html', `${results?.report}`)
  await chrome.kill()
})
