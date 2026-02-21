// src/components/Sidebar.tsx
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

export default function Sidebar() {
  const { filters, updateFilter, resetFilters } = useFilters()
  const [options, setOptions] = useState<FilterOptions>({
    years: [], topics: [], sectors: [], regions: [],
    pestles: [], sources: [], countries: [], cities: []
  })

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/data/filters`)
    .then(res => res.json())
    .then(json => {
      console.log('Filters response:', json)
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
    cursor: 'pointer'
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600' as const,
    color: '#555',
    marginBottom: '4px',
    display: 'block'
  }

  return (
    <div style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#f8f8f8',
      padding: '20px',
      borderRight: '1px solid #eee',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto'
    }}>
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
    </div>
  )
}