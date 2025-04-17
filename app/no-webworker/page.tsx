'use client'

import { Data } from '@/types'
import { Button } from 'antd'
import React from 'react'

export default function Page() {
  const [result, setResult] = React.useState<Data[]>([])

  const processData = () => {
    const data = new Array(10_000_000).fill(0).map((_, i) => ({
      id: i,
      value: Math.random(),
    }))
    const start = performance.now()

    // 同步计算会阻塞 UI
    const sorted = data.sort((a, b) => a.value - b.value)

    console.log('Sync Time:', performance.now() - start)
    setResult(sorted)
  }

  return (
    <div className="space-y-4">
      <div>
        <Button type="primary" onClick={processData}>
          {result.length ? `Processed ${result.length} items` : 'Process Data'}
        </Button>
      </div>
      <div>
        <Button type="primary" onClick={() => console.log('hello')}>
          Hello
        </Button>
      </div>
    </div>
  )
}
