'use client'

import { Button } from 'antd'
import React from 'react'

export default function Content() {
  const [isLoading, setIsLoading] = React.useState(false)
  const worker = React.useRef<Worker>(
    new Worker(new URL('./worker.ts', import.meta.url))
  )

  const processData = async () => {
    setIsLoading(true)
    setTimeout(() => {
      const start = performance.now()

      worker.current.postMessage(0)

      worker.current.onmessage = () => {
        console.log('Async Time:', performance.now() - start)
        setIsLoading(false)
      }
    }, 200)
  }

  return (
    <>
      <div className="space-y-4">
        <div>Webworker</div>
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
    </>
  )
}
