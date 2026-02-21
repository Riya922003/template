// src/context/FilterContext.tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface Filters {
  end_year: string
  topic: string
  sector: string
  region: string
  pestle: string
  source: string
  country: string
  city: string
}

interface FilterContextType {
  filters: Filters
  updateFilter: (key: keyof Filters, value: string) => void
  resetFilters: () => void
}

const defaultFilters: Filters = {
  end_year: '',
  topic: '',
  sector: '',
  region: '',
  pestle: '',
  source: '',
  country: '',
  city: ''
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters(defaultFilters)

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => useContext(FilterContext)