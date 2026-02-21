import { Radar } from 'react-chartjs-2'
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function PestRadar() {
  const data = {
    labels: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
    datasets: [{
      label: 'PEST Distribution',
      data: [45, 30, 25, 40, 20, 35],
      backgroundColor: 'rgba(115, 103, 240, 0.3)',
      borderColor: '#7367f0',
      pointBackgroundColor: '#7367f0',
    }]
  }

  return (
    <div style={{ width: '350px' }}>
      <h3>PEST Analysis</h3>
      <Radar data={data} />
    </div>
  )
}