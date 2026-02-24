import { useState, useEffect } from 'react'
import { useFilters } from '../context/FilterContext'

interface FilterOptions {
  years: string[]
  topics: string[]
  sectors: string[]
  regions: string[]
  pestles: string[]
  sources: string[]
  countries: string[]
  cities: string[]
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { filters, updateFilter, resetFilters } = useFilters()
  const [options, setOptions] = useState<FilterOptions>({
    years: [], topics: [], sectors: [], regions: [],
    pestles: [], sources: [], countries: [], cities: []
  })

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data/filters`)
      .then(res => res.json())
      .then(json => {
        setOptions({
          years: json.filters.years || [],
          topics: json.filters.topics || [],
          sectors: json.filters.sectors || [],
          regions: json.filters.regions || [],
          pestles: json.filters.pestles || [],
          sources: json.filters.sources || [],
          countries: json.filters.countries || [],
          cities: json.filters.cities || []
        })
      })
      .catch(err => console.error('Error fetching filters:', err))
  }, [])

  const selectStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '16px',
    fontSize: '13px',
    cursor: 'pointer',
    backgroundColor: 'white'
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: '#555',
    marginBottom: '4px',
    display: 'block'
  }

  return (
    <>
      {/* Toggle Button — always visible */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '20px',
          left: isOpen ? '230px' : '10px',
          zIndex: 1000,
          backgroundColor: '#7367f0',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'left 0.3s ease'
        }}>
        {isOpen ? '←' : '→'}
      </button>

      {/* Sidebar */}
      <div style={{
        width: isOpen ? '220px' : '0px',
        minHeight: '100vh',
        backgroundColor: '#f8f8f8',
        borderRight: isOpen ? '1px solid #eee' : 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: isOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        zIndex: 999,
        padding: isOpen ? '20px' : '0px',
      }}>

        {isOpen && (
          <>
            {/* Logo/Title */}
            <h2 style={{ color: '#7367f0', marginBottom: '24px', fontSize: '18px' }}>
              Dashboard
            </h2>

            <h4 style={{ marginBottom: '16px', color: '#333' }}>Filters</h4>

            {/* End Year */}
            <label style={labelStyle}>End Year</label>
            <select style={selectStyle} value={filters.end_year}
              onChange={e => updateFilter('end_year', e.target.value)}>
              <option value=''>All Years</option>
              {options.years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            {/* Topic */}
            <label style={labelStyle}>Topic</label>
            <select style={selectStyle} value={filters.topic}
              onChange={e => updateFilter('topic', e.target.value)}>
              <option value=''>All Topics</option>
              {options.topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Sector */}
            <label style={labelStyle}>Sector</label>
            <select style={selectStyle} value={filters.sector}
              onChange={e => updateFilter('sector', e.target.value)}>
              <option value=''>All Sectors</option>
              {options.sectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Region */}
            <label style={labelStyle}>Region</label>
            <select style={selectStyle} value={filters.region}
              onChange={e => updateFilter('region', e.target.value)}>
              <option value=''>All Regions</option>
              {options.regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {/* PEST */}
            <label style={labelStyle}>PEST</label>
            <select style={selectStyle} value={filters.pestle}
              onChange={e => updateFilter('pestle', e.target.value)}>
              <option value=''>All PEST</option>
              {options.pestles.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* Source */}
            <label style={labelStyle}>Source</label>
            <select style={selectStyle} value={filters.source}
              onChange={e => updateFilter('source', e.target.value)}>
              <option value=''>All Sources</option>
              {options.sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Country */}
            <label style={labelStyle}>Country</label>
            <select style={selectStyle} value={filters.country}
              onChange={e => updateFilter('country', e.target.value)}>
              <option value=''>All Countries</option>
              {options.countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* City */}
            <label style={labelStyle}>City</label>
            <select style={selectStyle} value={filters.city}
              onChange={e => updateFilter('city', e.target.value)}>
              <option value=''>All Cities</option>
              {options.cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Reset Button */}
            <button onClick={resetFilters} style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#7367f0',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Reset Filters
            </button>
          </>
        )}
      </div>
    </>
  )
}