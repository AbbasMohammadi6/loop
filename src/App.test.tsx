import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
  })

  it('does not render the counter section', () => {
    render(<App />)

    expect(screen.queryByRole('heading', { name: /counter/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /count is 0/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /decrease count/i })).not.toBeInTheDocument()
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

  it('loads saved todos from local storage on first render', () => {
    localStorage.setItem('todos', JSON.stringify(['Pay rent']))

    render(<App />)

    expect(screen.getByText(/pay rent/i)).toBeInTheDocument()
    expect(screen.getByText(/1 saved/i)).toBeInTheDocument()
  })

  it('persists todos to local storage when a todo is added', () => {
    render(<App />)

    fireEvent.change(screen.getByPlaceholderText(/write something worth finishing/i), {
      target: { value: 'Book dentist' },
    })
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }))

    expect(localStorage.getItem('todos')).toBe(JSON.stringify(['Book dentist']))
  })
})
