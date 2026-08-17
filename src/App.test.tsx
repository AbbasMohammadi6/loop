import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('decreases the count when the decrement button is clicked', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /count is 0/i }))

    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decrease count/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /decrease count/i }))

    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
  })
})
