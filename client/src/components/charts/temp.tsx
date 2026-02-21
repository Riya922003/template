interface Card {
  label: string
  value: number
  color: string
}

export default function KPICards() {
  const cards: Card[] = [
    { label: 'Total Insights', value: 400, color: '#7367f0' },
    { label: 'Avg Intensity', value: 4.5, color: '#28c76f' },
    { label: 'Avg Likelihood', value: 3.2, color: '#ff9f43' },
    { label: 'Avg Relevance', value: 2.8, color: '#00cfe8' },
  ]

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {cards.map((card: Card) => (
        <div key={card.label} style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: card.color,
          color: 'white',
          width: '150px',
          textAlign: 'center'
        }}>
          <h4>{card.label}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  )
}