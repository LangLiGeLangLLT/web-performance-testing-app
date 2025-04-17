import { Data } from '@/types'

self.onmessage = (e) => {
  const data = e.data
  const sorted = data.sort((a: Data, b: Data) => a.value - b.value)
  self.postMessage(sorted)
}
