// Simple test version of App to debug
export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Test</h1>
      <p>If you can see this, React is working!</p>
      
      {/* Test with just the KPI cards first */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#7367f0',
          color: 'white',
          width: '150px',
          textAlign: 'center'
        }}>
          <h4>Test Card</h4>
          <h2>123</h2>
        </div>
      </div>
    </div>
  )
}