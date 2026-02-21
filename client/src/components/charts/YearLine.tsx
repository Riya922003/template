import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export default function YearLine() {
  const data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [{
      label: 'Number of Insights',
      data: [20, 45, 38, 60, 55, 80],
      borderColor: '#7367f0',
      backgroundColor: 'rgba(115, 103, 240, 0.2)',
      tension: 0.4,
      fill: true,
    }]
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false } }
  }

  return (
    <div style={{ width: '400px' }}>
      <h3>Insights Over Years</h3>
      <Line data={data} options={options} />
    </div>
  )
}