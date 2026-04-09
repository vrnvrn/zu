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

    // Brand colors
    const TEAL = { r: 45, g: 107, b: 93 }       // #2d6b5d
    const TEAL_DARK = { r: 26, g: 74, b: 64 }    // #1a4a40
    const ETH_BLUE = { r: 98, g: 126, b: 234 }   // #627EEA
    const YELLOW = { r: 232, g: 213, b: 86 }      // #E8D556

    // Ethereum diamond — clean geometric outline
    const drawEthDiamond = (cx: number, cy: number, size: number, alpha: number, rotation: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      ctx.strokeStyle = `rgba(${ETH_BLUE.r}, ${ETH_BLUE.g}, ${ETH_BLUE.b}, 0.6)`
      ctx.lineWidth = 1
      // Outer diamond
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size * 0.58, 0)
      ctx.lineTo(0, size * 0.72)
      ctx.lineTo(-size * 0.58, 0)
      ctx.closePath()
      ctx.stroke()
      // Mid line
      ctx.beginPath()
      ctx.moveTo(-size * 0.58, 0)
      ctx.lineTo(size * 0.58, 0)
      ctx.stroke()
      ctx.restore()
    }

    // Subtle dot — brand teal or yellow
    const drawDot = (cx: number, cy: number, radius: number, alpha: number, color: { r: number; g: number; b: number }) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`
      ctx.fill()
      ctx.restore()
    }

    // Thin connecting line between two points
    const drawLine = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, 0.15)`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.restore()
    }

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      type: 'eth' | 'dot-teal' | 'dot-yellow' | 'dot-blue'
      size: number
      alpha: number
      phase: number
    }

    const particles: Particle[] = []
    const count = 30
    for (let i = 0; i < count; i++) {
      const types: Particle['type'][] = ['eth', 'dot-teal', 'dot-teal', 'dot-yellow', 'dot-blue']
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 1200,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        type: types[Math.floor(Math.random() * types.length)],
        size: 8 + Math.random() * 16,
        alpha: 0.08 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0
    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, w, h)

      // Base gradient — deep teal to dark, shifting slowly
      const shift = Math.sin(time * 0.3) * 0.5 + 0.5
      const grad = ctx.createLinearGradient(0, 0, w * 0.3, h)
      grad.addColorStop(0, `rgb(${21 + shift * 5}, ${56 + shift * 8}, ${48 + shift * 6})`)
      grad.addColorStop(0.4, `rgb(${15 + shift * 4}, ${42 + shift * 6}, ${38 + shift * 5})`)
      grad.addColorStop(0.7, `rgb(${18 + shift * 3}, ${35 + shift * 5}, ${42 + shift * 8})`)
      grad.addColorStop(1, `rgb(${12 + shift * 3}, ${28 + shift * 4}, ${36 + shift * 6})`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Subtle Ethereum blue glow — top right
      const glowX = w * 0.75 + Math.sin(time * 0.4) * 60
      const glowY = h * 0.25 + Math.cos(time * 0.3) * 40
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.35)
      glow.addColorStop(0, `rgba(${ETH_BLUE.r}, ${ETH_BLUE.g}, ${ETH_BLUE.b}, 0.06)`)
      glow.addColorStop(0.5, `rgba(${ETH_BLUE.r}, ${ETH_BLUE.g}, ${ETH_BLUE.b}, 0.02)`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Subtle teal glow — bottom left
      const glow2X = w * 0.2 + Math.cos(time * 0.35) * 50
      const glow2Y = h * 0.7 + Math.sin(time * 0.25) * 30
      const glow2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, w * 0.3)
      glow2.addColorStop(0, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, 0.08)`)
      glow2.addColorStop(0.6, `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, 0.02)`)
      glow2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow2
      ctx.fillRect(0, 0, w, h)

      // Yellow accent glow — subtle center
      const glow3X = w * 0.5 + Math.sin(time * 0.2) * 80
      const glow3Y = h * 0.45 + Math.cos(time * 0.15) * 50
      const glow3 = ctx.createRadialGradient(glow3X, glow3Y, 0, glow3X, glow3Y, w * 0.2)
      glow3.addColorStop(0, `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, 0.03)`)
      glow3.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow3
      ctx.fillRect(0, 0, w, h)

      // Move particles
      for (const p of particles) {
        p.x += p.vx + Math.sin(time + p.phase) * 0.08
        p.y += p.vy + Math.cos(time * 0.8 + p.phase) * 0.06

        if (p.x < -60) p.x = w + 60
        if (p.x > w + 60) p.x = -60
        if (p.y < -60) p.y = h + 60
        if (p.y > h + 60) p.y = -60
      }

      // Draw connecting lines between nearby particles (network/mesh effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const lineAlpha = (1 - dist / 200) * 0.12
            drawLine(particles[i].x, particles[i].y, particles[j].x, particles[j].y, lineAlpha)
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time * 1.5 + p.phase))

        switch (p.type) {
          case 'eth':
            drawEthDiamond(p.x, p.y, p.size, pulseAlpha, Math.sin(time * 0.2 + p.phase) * 0.1)
            break
          case 'dot-teal':
            drawDot(p.x, p.y, p.size * 0.15, pulseAlpha, TEAL)
            break
          case 'dot-yellow':
            drawDot(p.x, p.y, p.size * 0.12, pulseAlpha * 0.8, YELLOW)
            break
          case 'dot-blue':
            drawDot(p.x, p.y, p.size * 0.15, pulseAlpha, ETH_BLUE)
            break
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
