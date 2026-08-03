'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export interface Village {
  id: string
  name: string
  logo_url: string | null
  center: [number, number]
  dates: string
  location: string
  description: string
  village_type: 'popup' | 'permanent'
}

export function useVillages() {
  const [villages, setVillages] = useState<Village[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('villages')
      .select('id, name, logo_url, center, dates, location, description, village_type')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setError(error.message)
        } else {
          setVillages((data as Village[]) || [])
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { villages, loading, error }
}
