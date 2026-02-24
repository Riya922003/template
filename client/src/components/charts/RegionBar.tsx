import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface RegionItem {
  region: string
  count: number
  avgLikelihood: number
}

export default function RegionBar() {
  const [regions, setRegions] = useState<RegionItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/regions${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setRegions(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching regions:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return (
    <div style={{
      width: '100%',
      height: '350px',
      borderRadius: '10px',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite'
    }} />
  )

  // Show empty state message when no data
  if (!loading && regions.length === 0) {
    return (
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px', textAlign: 'center' }}>
        <h3>Likelihood by Region</h3>
        <div style={{ padding: '40px', color: '#666', fontSize: '16px' }}>
          No data available for selected filters
        </div>
      </div>
    )
  }

  const data = {
    labels: regions.map(r => r.region),
    datasets: [
      {
        label: 'Insight Count',
        data: regions.map(r => r.count),
        backgroundColor: '#7367f0',
        borderRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Avg Likelihood',
        data: regions.map(r => r.avgLikelihood),
        backgroundColor: '#28c76f',
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
            const item = regions[context.dataIndex]
            return context.datasetIndex === 0
              ? `Insights: ${item.count}`
              : `Avg Likelihood: ${item.avgLikelihood}`
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
        title: { display: true, text: 'Avg Likelihood' },
        grid: { drawOnChartArea: false }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px' }}>
      <h3>Likelihood by Region</h3>
      <Bar data={data} options={options} />
    </div>
  )
}