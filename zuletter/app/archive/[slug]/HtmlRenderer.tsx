'use client'

import { useEffect, useRef, useState } from 'react'

export default function HtmlRenderer({ content }: { content: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(600)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const resizeObserver = new ResizeObserver(() => {
      const doc = iframe.contentDocument
      if (doc?.body) {
        setHeight(doc.body.scrollHeight + 32)
      }
    })

    const handleLoad = () => {
      const doc = iframe.contentDocument
      if (doc?.body) {
        setHeight(doc.body.scrollHeight + 32)
        resizeObserver.observe(doc.body)
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => {
      iframe.removeEventListener('load', handleLoad)
      resizeObserver.disconnect()
    }
  }, [content])

  return (
    <iframe
      ref={iframeRef}
      srcDoc={content}
      style={{
        width: '100%',
        height: `${height}px`,
        border: 'none',
        borderRadius: '8px',
        background: 'white',
      }}
      sandbox="allow-same-origin"
      title="Newsletter content"
    />
  )
}
