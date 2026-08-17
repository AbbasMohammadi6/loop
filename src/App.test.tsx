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

  it('adds a todo from the form and renders it in the list', () => {
    render(<App />)

    const todoInput = screen.getAllByPlaceholderText(
      /write something worth finishing/i,
    )[0]
    const addButton = screen.getAllByRole('button', { name: /add todo/i })[0]

    fireEvent.change(todoInput, {
      target: { value: 'Buy oat milk' },
    })
    fireEvent.click(addButton)

    expect(screen.getAllByRole('list', { name: /todo list/i })[0]).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: /buy oat milk/i })).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText(/write something worth finishing/i)[0]).toHaveValue('')
  })
})
