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

export default function PestWithCard() {
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
  }, [filters])

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Static Info Card */}
        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative sphere */}
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }} />

          <div>
            <h3 style={{ 
              margin: '0 0 6px 0', 
              fontSize: '20px', 
              fontWeight: '600' 
            }}>
              System Status
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              opacity: 0.9 
            }}>
              All systems operational
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '30px',
            marginTop: '16px'
          }}>
            <div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                99.9%
              </div>
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8 
              }}>
                Uptime
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                Active
              </div>
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8 
              }}>
                Status
              </div>
            </div>
          </div>
        </div>

        {/* Loading PEST Chart */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px', textAlign: 'center' }}>
          <h3>PEST Analysis</h3>
          <div style={{ padding: '40px', color: '#666', fontSize: '16px' }}>
            Loading...
          </div>
        </div>
      </div>
    )
  }

  // Show empty state message when no data
  if (!loading && pestle.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Static Info Card */}
        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative sphere */}
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }} />

          <div>
            <h3 style={{ 
              margin: '0 0 6px 0', 
              fontSize: '20px', 
              fontWeight: '600' 
            }}>
              System Status
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              opacity: 0.9 
            }}>
              All systems operational
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '30px',
            marginTop: '16px'
          }}>
            <div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                99.9%
              </div>
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8 
              }}>
                Uptime
              </div>
            </div>
            <div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                Active
              </div>
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8 
              }}>
                Status
              </div>
            </div>
          </div>
        </div>

        {/* Empty PEST Chart */}
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px', textAlign: 'center' }}>
          <h3>PEST Analysis</h3>
          <div style={{ padding: '40px', color: '#666', fontSize: '16px' }}>
            No data available for selected filters
          </div>
        </div>
      </div>
    )
  }

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Static Info Card */}
      <div style={{
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        height: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative sphere */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }} />

        <div>
          <h3 style={{ 
            margin: '0 0 6px 0', 
            fontSize: '20px', 
            fontWeight: '600' 
          }}>
            System Status
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            opacity: 0.9 
          }}>
            All systems operational
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '30px',
          marginTop: '16px'
        }}>
          <div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              99.9%
            </div>
            <div style={{ 
              fontSize: '12px', 
              opacity: 0.8 
            }}>
              Uptime
            </div>
          </div>
          <div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              Active
            </div>
            <div style={{ 
              fontSize: '12px', 
              opacity: 0.8 
            }}>
              Status
            </div>
          </div>
        </div>
      </div>

      {/* PEST Analysis Chart */}
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', minHeight: '350px' }}>
        <h3>PEST Analysis</h3>
        <Radar data={data} options={options} />
      </div>
    </div>
  )
}