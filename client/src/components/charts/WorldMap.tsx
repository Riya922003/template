import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'

interface CountryItem {
  country: string
  count: number
  avgIntensity: number
}

// Map country names from your DB to match topojson country names
const countryNameMap: Record<string, string> = {
  'United States of America': 'United States of America',
  'USA': 'United States of America',
  'UK': 'United Kingdom',
  'Russia': 'Russia',
  'China': 'China',
  'India': 'India',
  'Brazil': 'Brazil',
  'Germany': 'Germany',
  'France': 'France',
  'Australia': 'Australia',
  'Canada': 'Canada',
  'Japan': 'Japan',
  'South Korea': 'South Korea',
  'Mexico': 'Mexico',
  'Indonesia': 'Indonesia',
  'Saudi Arabia': 'Saudi Arabia',
}

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [countries, setCountries] = useState<CountryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch real country data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/analytics/countries`)
      .then(res => res.json())
      .then(json => {
        setCountries(json.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching countries:', err)
        setLoading(false)
      })
  }, [])

  // Draw map when data is ready
  useEffect(() => {
    if (loading || !svgRef.current || countries.length === 0) return

    d3.select(svgRef.current).selectAll('*').remove()

    const width = 800
    const height = 450

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const maxCount = d3.max(countries, (d: CountryItem) => d.count) ?? 100

    const colorScale = d3.scaleSequential()
      .domain([0, maxCount])
      .interpolator(d3.interpolateBlues)

    const projection = d3.geoNaturalEarth1()
      .scale(150)
      .translate([width / 2, height / 2])

    const pathGenerator = d3.geoPath().projection(projection)

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'map-tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid #ccc')
      .style('borderRadius', '6px')
      .style('padding', '8px 12px')
      .style('fontSize', '13px')
      .style('pointerEvents', 'none')
      .style('display', 'none')
      .style('boxShadow', '0 2px 8px rgba(0,0,0,0.15)')

    fetch('/countries-110m.json')
      .then(res => res.json())
      .then((world: Topology<Objects>) => {
        const countriesGeo = topojson.feature(world, world.objects.countries)

        if (countriesGeo.type !== 'FeatureCollection') return

        // Build a lookup map for fast access
        const countryLookup: Record<string, CountryItem> = {}
        countries.forEach(c => {
          const mappedName = countryNameMap[c.country] || c.country
          countryLookup[mappedName] = c
        })

        svg.selectAll<SVGPathElement, d3.GeoPermissibleObjects>('path')
          .data(countriesGeo.features)
          .enter()
          .append('path')
          .attr('d', (d) => pathGenerator(d) ?? '')
          .attr('fill', (d: any) => {
            const name = d.properties?.name
            const found = countryLookup[name]
            return found ? colorScale(found.count) : '#e8e8e8'
          })
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5)
          .on('mouseover', function(_, d: any) {
            const name = d.properties?.name
            const found = countryLookup[name]
            if (found) {
              tooltip
                .style('display', 'block')
                .html(`
                  <strong>${found.country}</strong><br/>
                  Insights: ${found.count}<br/>
                  Avg Intensity: ${found.avgIntensity}
                `)
            }
          })
          .on('mousemove', function(event: MouseEvent) {
            tooltip
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 30}px`)
          })
          .on('mouseout', function() {
            tooltip.style('display', 'none')
          })
      })

    return () => {
      d3.selectAll('.map-tooltip').remove()
    }
  }, [countries, loading])

  if (loading) return (
    <div style={{
      width: '100%',
      height: '400px',
      borderRadius: '10px',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite'
    }} />
  )

  // Show empty state message when no data
  if (!loading && countries.length === 0) {
    return (
      <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%', textAlign: 'center' }}>
        <h3>Insights by Country</h3>
        <div style={{ padding: '40px', color: '#666', fontSize: '16px' }}>
          No data available for selected filters
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', width: '100%' }}>
      <h3>Insights by Country</h3>
      <svg ref={svgRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}