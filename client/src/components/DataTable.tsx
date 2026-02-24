import { useState, useEffect } from 'react'
import { useFilters } from '../context/FilterContext'

interface DataItem {
  _id: string
  topic: string
  sector: string
  region: string
  country: string
  intensity: number
  likelihood: number
  relevance: number
  pestle: string
  source: string
  end_year: string
}

interface Pagination {
  current_page: number
  per_page: number
  total_records: number
  total_pages: number
}

export default function DataTable() {
  const { filters } = useFilters()
  const [data, setData] = useState<DataItem[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    per_page: 10,
    total_records: 0,
    total_pages: 0
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  useEffect(() => {
    setLoading(true)

    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.append(key, val)
    })
    if (search) params.append('topic', search)
    params.append('page', currentPage.toString())
    params.append('limit', '10')

    fetch(`${import.meta.env.VITE_API_URL}/api/data?${params.toString()}`)
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setPagination(json.pagination)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching table data:', err)
        setLoading(false)
      })
  }, [filters, currentPage, search])

  const thStyle = {
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontSize: '12px',
    fontWeight: '600' as const,
    color: '#555',
    borderBottom: '2px solid #eee',
    whiteSpace: 'nowrap' as const
  }

  const tdStyle = {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#333',
    borderBottom: '1px solid #f0f0f0',
    whiteSpace: 'nowrap' as const
  }

  const getIntensityColor = (val: number) => {
    if (val >= 7) return '#ea5455'
    if (val >= 4) return '#ff9f43'
    return '#28c76f'
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: 0 }}>Data Insights</h3>
        <input
          type='text'
          placeholder='Search by topic...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '13px',
            width: '200px'
          }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          No data matches selected filters
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <th style={thStyle}>Topic</th>
                <th style={thStyle}>Country</th>
                <th style={thStyle}>PEST</th>
                <th style={thStyle}>Source</th>
                <th style={thStyle}>Intensity</th>
                <th style={thStyle}>Likelihood</th>
                <th style={thStyle}>Relevance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}
                  style={{ backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}>
                  <td style={tdStyle}>{item.topic || '—'}</td>
                  <td style={tdStyle}>{item.country || '—'}</td>
                  <td style={tdStyle}>{item.pestle || '—'}</td>
                  <td style={tdStyle}>{item.source || '—'}</td>
                  <td style={tdStyle}>
                    <span style={{
                      backgroundColor: getIntensityColor(item.intensity),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px'
                    }}>
                      {item.intensity}
                    </span>
                  </td>
                  <td style={tdStyle}>{item.likelihood}</td>
                  <td style={tdStyle}>{item.relevance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px'
      }}>
        <span style={{ fontSize: '13px', color: '#888' }}>
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, pagination.total_records)} of {pagination.total_records} entries
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              backgroundColor: 'white'
            }}>
            «
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              backgroundColor: 'white'
            }}>
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i
            if (page > pagination.total_pages) return null
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  backgroundColor: currentPage === page ? '#7367f0' : 'white',
                  color: currentPage === page ? 'white' : '#333'
                }}>
                {page}
              </button>
            )
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(pagination.total_pages, prev + 1))}
            disabled={currentPage === pagination.total_pages}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              cursor: currentPage === pagination.total_pages ? 'not-allowed' : 'pointer',
              backgroundColor: 'white'
            }}>
            ›
          </button>
          <button
            onClick={() => setCurrentPage(pagination.total_pages)}
            disabled={currentPage === pagination.total_pages}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              cursor: currentPage === pagination.total_pages ? 'not-allowed' : 'pointer',
              backgroundColor: 'white'
            }}>
            »
          </button>
        </div>
      </div>
    </div>
  )
}