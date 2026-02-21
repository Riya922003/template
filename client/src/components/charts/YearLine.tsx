import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

interface YearItem {
  year: string
  count: number
  avgIntensity: number
}

export default function YearLine() {
  const [years, setYears] = useState<YearItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/years${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setYears(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching years:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  const data = {
    labels: years.map(y => y.year),
    datasets: [
      {
        label: 'Number of Insights',
        data: years.map(y => y.count),
        borderColor: '#7367f0',
        backgroundColor: 'rgba(115, 103, 240, 0.2)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'Avg Intensity',
        data: years.map(y => y.avgIntensity),
        borderColor: '#ff9f43',
        backgroundColor: 'rgba(255, 159, 67, 0.2)',
        tension: 0.4,
        fill: false,
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
            const item = years[context.dataIndex]
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
        title: { display: true, text: 'Number of Insights' },
        position: 'left' as const
      },
      y1: {
        beginAtZero: true,
        title: { display: true, text: 'Avg Intensity' },
        position: 'right' as const,
        grid: { drawOnChartArea: false }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '450px' }}>
      <h3>Insights Over Years</h3>
      <Line data={data} options={options} />
    </div>
  )
}