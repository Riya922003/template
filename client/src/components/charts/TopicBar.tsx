import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function TopicBar() {
  const data = {
    labels: ['fracking', 'oil', 'gas', 'solar', 'climate', 'economy'],
    datasets: [{
      label: 'Avg Intensity',
      data: [3.5, 6, 2, 8, 5, 4],
      backgroundColor: '#7367f0',
      borderRadius: 6,
    }]
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: { legend: { display: false } }
  }

  return (
    <div style={{ width: '400px' }}>
      <h3>Intensity by Topic</h3>
      <Bar data={data} options={options} />
    </div>
  )
}