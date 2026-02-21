import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface CityItem {
  city: string
  count: number
  avgIntensity: number
}

export default function CityBar() {
  const [cities, setCities] = useState<CityItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/cities${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setCities(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching cities:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  if (cities.length === 0) {
    return (
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '450px' }}>
        <h3>Insights by City</h3>
        <p style={{ color: '#888' }}>No city data available</p>
      </div>
    )
  }

  const data = {
    labels: cities.map(c => c.city),
    datasets: [
      {
        label: 'Insight Count',
        data: cities.map(c => c.count),
        backgroundColor: '#7367f0',
        borderRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Avg Intensity',
        data: cities.map(c => c.avgIntensity),
        backgroundColor: '#ff9f43',
        borderRadius: 6,
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const item = cities[context.dataIndex]
            return context.datasetIndex === 0
              ? `Insights: ${item.count}`
              : `Avg Intensity: ${item.avgIntensity}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        position: 'left' as const,
        title: { display: true, text: 'Insight Count' }
      },
      y1: {
        beginAtZero: true,
        position: 'right' as const,
        title: { display: true, text: 'Avg Intensity' },
        grid: { drawOnChartArea: false }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '450px' }}>
      <h3>Insights by City</h3>
      <Bar data={data} options={options} />
    </div>
  )
}