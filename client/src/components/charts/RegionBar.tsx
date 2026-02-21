import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface RegionItem {
  region: string
  count: number
  avgLikelihood: number
}

export default function RegionBar() {
  const [regions, setRegions] = useState<RegionItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/regions`)
      .then(res => res.json())
      .then(json => {
        setRegions(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching regions:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

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
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '450px' }}>
      <h3>Likelihood by Region</h3>
      <Bar data={data} options={options} />
    </div>
  )
}