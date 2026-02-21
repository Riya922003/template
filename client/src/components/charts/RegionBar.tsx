import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function RegionBar() {
  const data = {
    labels: ['Asia', 'Europe', 'North America','Africa', 'South America'],
    datasets: [{
      label: 'Avg Likelihood',
      data: [4.5, 3.2, 5.1, 2.8, 3.9],
      backgroundColor: ['#7367f0', '#28c76f', '#ff9f43', '#00cfe8', '#ea5455'],
      borderRadius: 6,
    }]
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false } }
  }

  return (
    <div style={{ width: '400px' }}>
      <h3>Likelihood by Region</h3>
      <Bar data={data} options={options} />
    </div>
  )
}