import KPICards from './components/charts/temp'
import SectorDonut from './components/charts/SectorDonut'
import TopicBar from './components/charts/TopicBar'
import YearLine from './components/charts/YearLine'
import PestRadar from './components/charts/PestRadar'
import ScatterPlot from './components/charts/ScatterPlot'
import RegionBar from './components/charts/RegionBar'
import WorldMap from './components/charts/WorldMap'
import CityBar from './components/charts/CityBar'
import { FilterProvider } from './context/FilterContext'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <FilterProvider>
      <div style={{ display: 'flex' }}>
        
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content pushed right */}
        <div style={{ marginLeft: '260px', padding: '20px', flex: 1 }}>
          
          <KPICards />

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <SectorDonut />
            <TopicBar />
            <CityBar />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <YearLine />
            <RegionBar />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <PestRadar />
            <ScatterPlot />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <WorldMap />
          </div>

        </div>
      </div>
    </FilterProvider>
  )
}