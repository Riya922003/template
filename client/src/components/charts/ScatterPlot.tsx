import { Scatter } from 'react-chartjs-2'
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

Chart.register(LinearScale, PointElement, Tooltip, Legend)

export default function ScatterPlot() {
  const data = {
    datasets: [{
      label: 'Likelihood vs Relevance',
      data: [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        { x: 2, y: 6 },
        { x: 5, y: 3 },
        { x: 4, y: 7 },
        { x: 6, y: 5 },
      ],
      backgroundColor: '#7367f0',
      pointRadius: 6,
    }]
  }

  const options = {
    scales: {
      x: { title: { display: true, text: 'Relevance' } },
      y: { title: { display: true, text: 'Likelihood' } }
    }
  }

  return (
    <div style={{ width: '400px' }}>
      <h3>Likelihood vs Relevance</h3>
      <Scatter data={data} options={options} />
    </div>
  )
}