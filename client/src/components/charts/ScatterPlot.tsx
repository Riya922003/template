import { useState, useEffect } from 'react'
import { Scatter } from 'react-chartjs-2'
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(LinearScale, PointElement, Tooltip, Legend)

interface ScatterItem {
  x: number
  y: number
  intensity: number
  sector: string
  topic: string
}

export default function ScatterPlot() {
  const [scatterData, setScatterData] = useState<ScatterItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { filters } = useFilters()

  // Build query params from filters
  const buildParams = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.append(key, val)
    })
    return params.toString()
  }

  useEffect(() => {
    setLoading(true)
    const queryString = buildParams()
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/scatter${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setScatterData(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching scatter data:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  // Show empty state message when no data
  if (!loading && scatterData.length === 0) {
    return (
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px', textAlign: 'center' }}>
        <h3>Likelihood vs Relevance</h3>
        <div style={{ padding: '40px', color: '#666', fontSize: '16px' }}>
          No data available for selected filters
        </div>
      </div>
    )
  }

  const data = {
    datasets: [{
      label: 'Likelihood vs Relevance',
      data: scatterData.map(item => ({ x: item.x, y: item.y })),
      backgroundColor: scatterData.map(item => {
        // color dots by intensity level
        if (item.intensity >= 7) return 'rgba(234, 84, 85, 0.7)'   // high — red
        if (item.intensity >= 4) return 'rgba(255, 159, 67, 0.7)'  // medium — orange
        return 'rgba(115, 103, 240, 0.7)'                           // low — purple
      }),
      pointRadius: 6,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const item = scatterData[context.dataIndex]
            return [
              `Relevance: ${item.x}`,
              `Likelihood: ${item.y}`,
              `Intensity: ${item.intensity}`,
              `Sector: ${item.sector}`,
              `Topic: ${item.topic}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Relevance' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Likelihood' }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px' }}>
      <h3>Likelihood vs Relevance</h3>
      {/* Legend for intensity colors */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '10px', fontSize: '12px' }}>
        <span><span style={{ color: '#ea5455' }}>●</span> High Intensity (7+)</span>
        <span><span style={{ color: '#ff9f43' }}>●</span> Medium Intensity (4-6)</span>
        <span><span style={{ color: '#7367f0' }}>●</span> Low Intensity (0-3)</span>
      </div>
      <Scatter data={data} options={options} />
    </div>
  )
}