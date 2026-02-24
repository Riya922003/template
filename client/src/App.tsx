import { useState } from 'react'
import KPISlideshow from './components/charts/KPISlideshow'
import SectorDonut from './components/charts/SectorDonut'
import TopicBar from './components/charts/TopicBar'
import YearLine from './components/charts/YearLine'
import PestRadar from './components/charts/PestRadar'
import ScatterPlot from './components/charts/ScatterPlot'
import RegionBar from './components/charts/RegionBar'
import WorldMap from './components/charts/WorldMap'
import DataTable from './components/DataTable'
import { FilterProvider } from './context/FilterContext'
import Sidebar from './components/Sidebar'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <FilterProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main content with dynamic margin */}
        <div style={{ 
          marginLeft: sidebarOpen ? '260px' : '60px',
          padding: '20px', 
          flex: 1,
          maxWidth: sidebarOpen ? 'calc(100vw - 280px)' : 'calc(100vw - 80px)',
          overflow: 'hidden',
          transition: 'margin-left 0.3s ease, max-width 0.3s ease'
        }}>
          
          {/* Header with Search Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '600', 
                color: '#333',
                margin: 0
              }}>
                Analytics Dashboard
              </h1>
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                margin: '4px 0 0 0' 
              }}>
                Welcome back! Here's what's happening with your data today.
              </p>
            </div>
            
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search insights..."
                style={{
                  width: '300px',
                  padding: '12px 16px 12px 45px',
                  borderRadius: '25px',
                  border: '1px solid #e0e0e0',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7367f0'
                  e.target.style.boxShadow = '0 4px 12px rgba(115, 103, 240, 0.15)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              {/* Search Icon */}
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                fontSize: '16px'
              }}>
                🔍
              </div>
            </div>
          </div>
          
          {/* First row - Sector Breakdown, PEST Analysis, KPI Slideshow with System Status */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '20px', 
            marginBottom: '20px' 
          }}>
            <SectorDonut />
            <PestRadar />
            <KPISlideshow />
          </div>

          {/* Second row - Intensity by Topic, Insights Over Years */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px', 
            marginBottom: '20px' 
          }}>
            <TopicBar />
            <YearLine />
          </div>

          {/* Third row - Likelihood by Region, Likelihood vs Relevance */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px', 
            marginBottom: '20px' 
          }}>
            <RegionBar />
            <ScatterPlot />
          </div>

          {/* Fourth row - World Map and DataTable */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px', 
            marginBottom: '20px' 
          }}>
            <WorldMap />
            <DataTable />
          </div>

        </div>
      </div>
    </FilterProvider>
  )
}