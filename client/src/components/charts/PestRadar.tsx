import { useState, useEffect } from 'react'
import { Radar } from 'react-chartjs-2'
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface PestleItem {
  pestle: string
  count: number
  avgIntensity: number
}

export default function PestRadar() {
  const [pestle, setPestle] = useState<PestleItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/pestle${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setPestle(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching pestle:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  const data = {
    labels: pestle.map(p => p.pestle),
    datasets: [
      {
        label: 'Insight Count',
        data: pestle.map(p => p.count),
        backgroundColor: 'rgba(115, 103, 240, 0.3)',
        borderColor: '#7367f0',
        pointBackgroundColor: '#7367f0',
        fill: true
      },
      {
        label: 'Avg Intensity',
        data: pestle.map(p => p.avgIntensity),
        backgroundColor: 'rgba(255, 159, 67, 0.3)',
        borderColor: '#ff9f43',
        pointBackgroundColor: '#ff9f43',
        fill: true
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
            const item = pestle[context.dataIndex]
            return context.datasetIndex === 0
              ? `Count: ${item.count}`
              : `Avg Intensity: ${item.avgIntensity}`
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { stepSize: 10 }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '400px' }}>
      <h3>PEST Analysis</h3>
      <Radar data={data} options={options} />
    </div>
  )
}