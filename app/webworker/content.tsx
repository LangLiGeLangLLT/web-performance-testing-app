'use client'

import { Data } from '@/types'
import { Button } from 'antd'
import React from 'react'

export default function Content() {
  const [result, setResult] = React.useState<Data[]>([])
  const worker = React.useRef<Worker>(
    new Worker(new URL('./worker.ts', import.meta.url))
  )

  const processData = async () => {
    const data = Array.from({ length: 1e5 }, (_, i) => ({
      id: i,
      value: Math.random(),
    }))
    const start = performance.now()

    worker.current.postMessage(data)

    worker.current.onmessage = (e) => {
      console.log('Async Time:', performance.now() - start)
      setResult(e.data)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <Button type="primary" onClick={processData}>
            {result.length
              ? `Processed ${result.length} items`
              : 'Process Data'}
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => console.log('hello')}>
            Hello
          </Button>
        </div>
      </div>
    </>
  )
}
