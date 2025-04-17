import { Data } from '@/types'

self.onmessage = () => {
  const data = new Array(10_000_000).fill(0).map((_, i) => ({
    id: i,
    value: Math.random(),
  }))
  const sorted = data.sort((a: Data, b: Data) => a.value - b.value)
  self.postMessage(sorted)
}
