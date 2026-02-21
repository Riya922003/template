import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'

interface CountryData {
  country: string
  code: number
  count: number
}

const staticData: CountryData[] = [
  { country: 'USA', code: 840, count: 120 },
  { country: 'China', code: 156, count: 80 },
  { country: 'India', code: 356, count: 60 },
  { country: 'Russia', code: 643, count: 45 },
  { country: 'Brazil', code: 76, count: 30 },
  { country: 'Germany', code: 276, count: 25 },
  { country: 'UK', code: 826, count: 40 },
  { country: 'France', code: 250, count: 20 },
  { country: 'Australia', code: 36, count: 15 },
  { country: 'Canada', code: 124, count: 35 },
]

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    d3.select(svgRef.current).selectAll('*').remove()

    const width = 800
    const height = 450

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const maxCount = d3.max(staticData, (d: CountryData) => d.count) ?? 100

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
        const countries = topojson.feature(world, world.objects.countries)

        if (countries.type !== 'FeatureCollection') return

        svg.selectAll<SVGPathElement, d3.GeoPermissibleObjects>('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', (d) => pathGenerator(d) ?? '')
          .attr('fill', (d) => {
            const found = staticData.find(c => c.code === Number(d.id))
            return found ? colorScale(found.count) : '#e8e8e8'
          })
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5)
          .on('mouseover', function(event: MouseEvent, d) {
            const found = staticData.find(c => c.code === Number(d.id))
            if (found) {
              tooltip
                .style('display', 'block')
                .html(`<strong>${found.country}</strong><br/>Insights: ${found.count}`)
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
  }, [])

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px' }}>
      <h3>Insights by Country</h3>
      <svg ref={svgRef} />
    </div>
  )
}