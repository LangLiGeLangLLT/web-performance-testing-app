import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <div>
        <div>Optimized</div>
        <Image src="/pexels-katja.jpg" alt="" width={400} height={300} />
      </div>
      <div>
        <div>Unoptimized</div>
        <picture>
          <img src="/pexels-katja.jpg" alt="" width={400} height={300} />
        </picture>
      </div>
    </div>
  )
}
