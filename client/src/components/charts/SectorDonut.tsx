import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(ArcElement, Tooltip, Legend)

interface SectorItem {
  sector: string
  count: number
  avgIntensity: number
}

export default function SectorDonut() {
  const [sectors, setSectors] = useState<SectorItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/sectors${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setSectors(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching sectors:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  const data = {
    labels: sectors.map(s => s.sector),
    datasets: [{
      data: sectors.map(s => s.count),
      backgroundColor: [
        '#7367f0', '#28c76f', '#ff9f43',
        '#00cfe8', '#ea5455', '#ff6384',
        '#36a2eb', '#ffcd56', '#4bc0c0'
      ],
      borderWidth: 0,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const item = sectors[context.dataIndex]
            return `${item.sector}: ${item.count} insights (Avg Intensity: ${item.avgIntensity})`
          }
        }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '350px' }}>
      <h3>Sector Breakdown</h3>
      <Doughnut data={data} options={options} />
    </div>
  )
}