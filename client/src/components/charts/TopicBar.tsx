import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { useFilters } from '../../context/FilterContext'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface TopicItem {
  topic: string
  avgIntensity: number
  count: number
}

export default function TopicBar() {
  const [topics, setTopics] = useState<TopicItem[]>([])
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
    const url = `${import.meta.env.VITE_API_URL}/api/analytics/topics${queryString ? `?${queryString}` : ''}`
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setTopics(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching topics:', err)
        setLoading(false)
      })
  }, [filters]) // Re-fetch when filters change

  if (loading) return <div>Loading...</div>

  const data = {
    labels: topics.map(t => t.topic),
    datasets: [{
      label: 'Avg Intensity',
      data: topics.map(t => t.avgIntensity),
      backgroundColor: '#7367f0',
      borderRadius: 6,
    }]
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const item = topics[context.dataIndex]
            return `Avg Intensity: ${item.avgIntensity} (${item.count} insights)`
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Avg Intensity' }
      }
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '450px' }}>
      <h3>Intensity by Topic</h3>
      <Bar data={data} options={options} />
    </div>
  )
}