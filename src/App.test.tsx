import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders MiDAS Search & Retrieval Tool heading', () => {
    render(<App />)
    const heading = screen.getByText('MiDAS Search & Retrieval Tool')
    expect(heading).toBeInTheDocument()
  })

  it('renders National Archives content in header', () => {
    render(<App />)
    const text = screen.getAllByText('National Archives and Records Administration')[0]
    expect(text).toBeInTheDocument()
  })

  it('renders search page content by default', () => {
    render(<App />)
    const searchHeading = screen.getByText('Search National Archives Records')
    expect(searchHeading).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<App />)
    const searchTab = screen.getByRole('tab', { name: 'Search' })
    const resultsTab = screen.getByRole('tab', { name: 'Results' })
    expect(searchTab).toBeInTheDocument()
    expect(resultsTab).toBeInTheDocument()
  })
})