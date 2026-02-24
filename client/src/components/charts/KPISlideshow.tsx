import { useState, useEffect } from 'react'
import { useFilters } from '../../context/FilterContext'
interface KPIData {
  totalInsights: number
  avgIntensity: number
  avgLikelihood: number
  avgRelevance: number
}
interface Slide {
  title: string
  subtitle: string
  metrics: Array<{
    label: string
    value: string | number
  }>
  color: string
}
export default function KPISlideshow() {
  const { filters } = useFilters()
  const [kpiData, setKpiData] = useState<KPIData>({
    totalInsights: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

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

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const slides: Slide[] = [
    {
      title: 'Data Analytics',
      subtitle: `Total ${kpiData.totalInsights} Insights Available`,
      metrics: [
        { label: 'Total', value: kpiData.totalInsights },
        { label: 'Insights', value: 'Records' }
      ],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Intensity Metrics',
      subtitle: `Average ${kpiData.avgIntensity} Intensity Score`,
      metrics: [
        { label: 'Avg', value: kpiData.avgIntensity },
        { label: 'Intensity', value: 'Score' }
      ],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Likelihood Analysis',
      subtitle: `Average ${kpiData.avgLikelihood} Likelihood Rate`,
      metrics: [
        { label: 'Avg', value: kpiData.avgLikelihood },
        { label: 'Likelihood', value: 'Rate' }
      ],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Relevance Insights',
      subtitle: `Average ${kpiData.avgRelevance} Relevance Score`,
      metrics: [
        { label: 'Avg', value: kpiData.avgRelevance },
        { label: 'Relevance', value: 'Score' }
      ],
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* User Card - Same size as KPI card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: '700',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              DA
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                Data Analyst
              </div>
              <div style={{ fontSize: '16px', opacity: 0.9 }}>
                Dashboard Overview
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
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
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#28c76f'
            }} />
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Online</span>
          </div>
        </div>

        {/* System Status Card */}
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

        {/* Loading KPI Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* User Card - Same size as KPI card */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            DA
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
              Data Analyst
            </div>
            <div style={{ fontSize: '16px', opacity: 0.9 }}>
              Dashboard Overview
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
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
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#28c76f'
          }} />
          <span style={{ fontSize: '12px', opacity: 0.8 }}>Online</span>
        </div>
      </div>

      {/* System Status Card */}
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

      {/* KPI Slideshow */}
      <div style={{
        background: currentSlideData.color,
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        height: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s ease-in-out'
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

        {/* Content */}
        <div>
          <h3 style={{ 
            margin: '0 0 6px 0', 
            fontSize: '20px', 
            fontWeight: '600' 
          }}>
            {currentSlideData.title}
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            opacity: 0.9 
          }}>
            {currentSlideData.subtitle}
          </p>
        </div>

        {/* Metrics */}
        <div style={{ 
          display: 'flex', 
          gap: '30px',
          marginTop: '16px'
        }}>
          {currentSlideData.metrics.map((metric, index) => (
            <div key={index}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                marginBottom: '2px'
              }}>
                {metric.value}
              </div>
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8 
              }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          gap: '6px'
        }}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}