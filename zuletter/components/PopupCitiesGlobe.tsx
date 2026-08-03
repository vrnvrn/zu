'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useVillages, Village } from '@/lib/useVillages'

const DEFAULT_CENTER: [number, number] = [19.3744, 42.7087] // Montenegro
const DEFAULT_ZOOM = 1.4

function isFrom2026(dates: string): boolean {
  return /2026/.test(dates) || /coming/i.test(dates)
}

export default function PopupCitiesGlobe() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map())

  const { villages, loading, error } = useVillages()
  const [mapReady, setMapReady] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Village | null>(null)

  const popupVillages2026 = useMemo(
    () => villages.filter((v) => v.village_type === 'popup' && isFrom2026(v.dates)),
    [villages]
  )

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (map.current || !mapContainer.current || !token) return

    mapboxgl.accessToken = token

    try {
      const m = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        projection: { name: 'globe' } as any,
      })
      map.current = m
      m.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
      m.on('error', (e) => {
        if (e.error && e.error.message.includes('WebGL')) {
          setMapError(e.error.message)
        }
      })
      m.once('load', () => setMapReady(true))
    } catch (e: any) {
      setMapError(e.message || 'Failed to load map')
    }

    return () => {
      setMapReady(false)
      markersRef.current.forEach((mk) => mk.remove())
      markersRef.current.clear()
      map.current?.remove()
      map.current = null
    }
  }, [])

  const renderMarkers = useCallback(() => {
    if (!map.current) return
    markersRef.current.forEach((mk) => mk.remove())
    markersRef.current.clear()

    popupVillages2026.forEach((village) => {
      const el = document.createElement('div')
      el.style.cursor = 'pointer'
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div style="
            display:flex;align-items:center;gap:8px;
            background:rgba(255,255,255,0.97);
            padding:6px 12px 6px 6px;border-radius:20px;
            box-shadow:0 4px 16px rgba(0,0,0,0.15);
            max-width:200px;
          ">
            <img src="${village.logo_url || '/favicon.ico'}" alt="${village.name}"
              style="width:26px;height:26px;border-radius:6px;object-fit:cover;flex-shrink:0;"
              onerror="this.onerror=null;this.style.display='none';" />
            <div style="display:flex;flex-direction:column;line-height:1.2;min-width:0;overflow:hidden;">
              <span style="font-weight:600;font-size:12px;color:#1a3d35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${village.name}</span>
              <span style="font-size:10px;color:#6b8a82;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${village.location || ''}</span>
            </div>
          </div>
          <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(255,255,255,0.97);margin-top:-1px;"></div>
        </div>
      `
      el.addEventListener('click', () => setSelected(village))
      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(village.center)
        .addTo(map.current!)
      markersRef.current.set(village.id, marker)
    })
  }, [popupVillages2026])

  useEffect(() => {
    if (mapReady) renderMarkers()
  }, [mapReady, renderMarkers])

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

      {(loading || (!mapReady && !mapError)) && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading map…</p>
        </div>
      )}

      {(error || mapError) && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '1rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            {mapError ? 'Interactive map unavailable (WebGL disabled).' : `Couldn't load pop-up cities: ${error}`}
          </p>
        </div>
      )}

      {selected && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          maxWidth: '360px',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '1rem',
        }}>
          <button
            onClick={() => setSelected(null)}
            aria-label="Close"
            style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: '1rem' }}
          >
            ✕
          </button>
          <h3 style={{ marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{selected.name}</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>{selected.dates}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{selected.location}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{selected.description}</p>
        </div>
      )}
    </div>
  )
}
