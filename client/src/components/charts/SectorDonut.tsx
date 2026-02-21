import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

export default function SectorDonut() {
  const data = {
    labels: ['Energy', 'Finance', 'Health', 'Technology', 'Environment'],
    datasets: [{
      data: [120, 80, 60, 45, 30],
      backgroundColor: ['#7367f0', '#28c76f', '#ff9f43', '#00cfe8', '#ea5455'],
      borderWidth: 0,
    }]
  }

  return (
    <div style={{ width: '300px' }}>
      <h3>Sector Breakdown</h3>
      <Doughnut data={data} />
    </div>
  )
}