import KPICards from './components/charts/temp'
import SectorDonut from './components/charts/SectorDonut'
import TopicBar from './components/charts/TopicBar'
import YearLine from './components/charts/YearLine'
import PestRadar from './components/charts/PestRadar'
import ScatterPlot from './components/charts/ScatterPlot'
import RegionBar from './components/charts/RegionBar'

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <KPICards />
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <SectorDonut />
        <TopicBar />
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <YearLine />
        <RegionBar />
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <PestRadar />
        <ScatterPlot />
      </div>
    </div>
  )
}