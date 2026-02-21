import { useState, useEffect } from 'react'
import { useFilters } from '../../context/FilterContext'

interface KPIData {
  totalInsights: number
  avgIntensity: number
  avgLikelihood: number
  avgRelevance: number
}

interface Card {
  label: string
  value: number
  color: string
}

export default function KPICards() {
  const { filters } = useFilters()
  const [kpiData, setKpiData] = useState<KPIData>({
    totalInsights: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const queryParams = new URLSearchParams()
    
    // Add filters to query params
    if (filters.topic) queryParams.append('topic', filters.topic)
    if (filters.sector) queryParams.append('sector', filters.sector)
    if (filters.region) queryParams.append('region', filters.region)
    if (filters.country) queryParams.append('country', filters.country)
    if (filters.pestle) queryParams.append('pestle', filters.pestle)
    if (filters.source) queryParams.append('source', filters.source)
    if (filters.end_year) queryParams.append('end_year', filters.end_year)
    if (filters.city) queryParams.append('city', filters.city)

    const url = `${import.meta.env.VITE_API_URL}/api/analytics/kpi${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setKpiData(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching KPI data:', err)
        setLoading(false)
      })
  }, [filters])

  const cards: Card[] = [
    { label: 'Total Insights', value: kpiData.totalInsights, color: '#7367f0' },
    { label: 'Avg Intensity',  value: kpiData.avgIntensity,  color: '#28c76f' },
    { label: 'Avg Likelihood', value: kpiData.avgLikelihood, color: '#ff9f43' },
    { label: 'Avg Relevance',  value: kpiData.avgRelevance,  color: '#00cfe8' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            width: '150px',
            height: '80px'
          }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {cards.map((card: Card) => (
        <div key={card.label} style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: card.color,
          color: 'white',
          width: '150px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{card.label}</h4>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{card.value}</h2>
        </div>
      ))}
    </div>
  )
}
