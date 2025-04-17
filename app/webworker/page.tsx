'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const Content = dynamic(() => import('./content'), {
  ssr: false,
})

export default function Page() {
  return <Content />
}
