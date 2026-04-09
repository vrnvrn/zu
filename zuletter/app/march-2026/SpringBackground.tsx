'use client'

import { useEffect, useRef } from 'react'

export default function SpringBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Ethereum diamond shape
    const drawDiamond = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = '#8BA4F8'
      ctx.lineWidth = 2
      ctx.shadowColor = '#8BA4F8'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(cx, cy - size)
      ctx.lineTo(cx + size * 0.6, cy)
      ctx.lineTo(cx, cy + size * 0.75)
      ctx.lineTo(cx - size * 0.6, cy)
      ctx.closePath()
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx - size * 0.6, cy)
      ctx.lineTo(cx + size * 0.6, cy)
      ctx.stroke()
      ctx.restore()
    }

    // Unicorn emoji
    const drawUnicorn = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.font = `${size}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('\u{1F984}', cx, cy)
      ctx.restore()
    }

    // Bright flower
    const drawFlower = (cx: number, cy: number, size: number, alpha: number, time: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.3)
      const petals = 5
      const brightColors = ['#FF6B9D', '#FF85B3', '#FF9EC7', '#FFA8D0', '#FFB8DA']
      for (let i = 0; i < petals; i++) {
        ctx.rotate((Math.PI * 2) / petals)
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.6, size * 0.25, size * 0.55, 0, 0, Math.PI * 2)
        ctx.fillStyle = brightColors[i]
        ctx.fill()
      }
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE45C'
      ctx.fill()
      ctx.restore()
    }

    // Rainbow arc
    const drawRainbow = (cx: number, cy: number, radius: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      const colors = ['#FF3B3B', '#FF8C42', '#FFE156', '#56FF6E', '#56C8FF', '#7B61FF', '#D156FF']
      for (let i = 0; i < colors.length; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, radius - i * 3.5, Math.PI, 0)
        ctx.strokeStyle = colors[i]
        ctx.lineWidth = 3.5
        ctx.stroke()
      }
      ctx.restore()
    }

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      type: 'diamond' | 'unicorn' | 'flower' | 'rainbow' | 'sparkle'
      size: number
      alpha: number
      phase: number
    }

    const particles: Particle[] = []
    const count = 50
    for (let i = 0; i < count; i++) {
      const types: Particle['type'][] = ['diamond', 'unicorn', 'flower', 'rainbow', 'sparkle']
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 4000,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.25 - 0.1,
        type: types[Math.floor(Math.random() * types.length)],
        size: 14 + Math.random() * 24,
        alpha: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    const animate = () => {
      time += 0.01

      ctx.clearRect(0, 0, w, h)

      // Bright animated gradient — vivid spring + Ethereum colors
      const grad = ctx.createLinearGradient(0, 0, w, h)
      const shift = Math.sin(time * 0.4) * 0.5 + 0.5
      grad.addColorStop(0, `hsl(${150 + shift * 20}, 65%, ${55 + shift * 10}%)`)
      grad.addColorStop(0.25, `hsl(${190 + shift * 30}, 70%, ${50 + shift * 10}%)`)
      grad.addColorStop(0.5, `hsl(${250 + shift * 20}, 65%, ${55 + shift * 8}%)`)
      grad.addColorStop(0.75, `hsl(${300 + shift * 30}, 60%, ${55 + shift * 10}%)`)
      grad.addColorStop(1, `hsl(${340 + shift * 20}, 65%, ${50 + shift * 10}%)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Bright rainbow shimmer bands across full height
      const bandCount = Math.max(4, Math.ceil(h / 300))
      for (let i = 0; i < bandCount; i++) {
        const y = h * ((i + 0.5) / bandCount) + Math.sin(time + i * 1.5) * 50
        const rainbowGrad = ctx.createLinearGradient(0, y - 25, 0, y + 25)
        const hueBase = (time * 40 + i * 90) % 360
        rainbowGrad.addColorStop(0, `hsla(${hueBase}, 100%, 70%, 0)`)
        rainbowGrad.addColorStop(0.5, `hsla(${hueBase}, 100%, 70%, 0.12)`)
        rainbowGrad.addColorStop(1, `hsla(${(hueBase + 60) % 360}, 100%, 70%, 0)`)
        ctx.fillStyle = rainbowGrad
        ctx.fillRect(0, y - 40, w, 80)
      }

      // Draw floating particles across full page
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.x += Math.sin(time * 2 + p.phase) * 0.3

        if (p.y < -50) p.y = h + 50
        if (p.x < -50) p.x = w + 50
        if (p.x > w + 50) p.x = -50

        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time * 2 + p.phase))

        switch (p.type) {
          case 'diamond':
            drawDiamond(p.x, p.y, p.size, pulseAlpha)
            break
          case 'unicorn':
            drawUnicorn(p.x, p.y, p.size * 1.8, pulseAlpha)
            break
          case 'flower':
            drawFlower(p.x, p.y, p.size * 0.8, pulseAlpha, time)
            break
          case 'rainbow':
            drawRainbow(p.x, p.y, p.size * 1.8, pulseAlpha * 0.8)
            break
          case 'sparkle': {
            ctx.save()
            ctx.globalAlpha = pulseAlpha
            const sparkSize = p.size * 0.4
            const sparkColor = `hsl(${(time * 80 + p.phase * 57) % 360}, 100%, 75%)`
            ctx.strokeStyle = sparkColor
            ctx.shadowColor = sparkColor
            ctx.shadowBlur = 6
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(p.x - sparkSize, p.y)
            ctx.lineTo(p.x + sparkSize, p.y)
            ctx.moveTo(p.x, p.y - sparkSize)
            ctx.lineTo(p.x, p.y + sparkSize)
            // Diagonal cross
            const d = sparkSize * 0.7
            ctx.moveTo(p.x - d, p.y - d)
            ctx.lineTo(p.x + d, p.y + d)
            ctx.moveTo(p.x + d, p.y - d)
            ctx.lineTo(p.x - d, p.y + d)
            ctx.stroke()
            ctx.restore()
            break
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
