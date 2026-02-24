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
  return (
    <FilterProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content with optimized layout */}
        <div style={{ 
          marginLeft: '260px', 
          padding: '20px', 
          flex: 1,
          maxWidth: 'calc(100vw - 280px)',
          overflow: 'hidden'
        }}>
          
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