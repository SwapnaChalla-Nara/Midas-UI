import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders MiDAS UI heading', () => {
    render(<App />)
    const heading = screen.getByText('MiDAS UI')
    expect(heading).toBeInTheDocument()
  })

  it('renders AI-driven Development Platform text', () => {
    render(<App />)
    const text = screen.getByText('AI-driven Development Platform')
    expect(text).toBeInTheDocument()
  })
})