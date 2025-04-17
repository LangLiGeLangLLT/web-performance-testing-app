'use client'

import { Button } from 'antd'
import React from 'react'

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false)

  const processData = () => {
    setIsLoading(true)
    setTimeout(() => {
      const data = new Array(10_000_000).fill(0).map((_, i) => ({
        id: i,
        value: Math.random(),
      }))
      const start = performance.now()

      data.sort((a, b) => a.value - b.value)

      console.log('Sync Time:', performance.now() - start)
      setIsLoading(false)
    }, 200)
  }

  return (
    <div className="space-y-4">
      <div>No Webworker</div>
      <div>
        <Button type="primary" onClick={processData}>
          Process Data
        </Button>
      </div>
      <div>
        <Button type="primary" onClick={() => console.log('hello')}>
          Hello
        </Button>
      </div>
      {isLoading && <div>Processing...</div>}
    </div>
  )
}
