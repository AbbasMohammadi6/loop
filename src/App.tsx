import { useEffect, useState } from 'react'
import './App.css'

const TODOS_STORAGE_KEY = 'todos'

function loadTodos() {
  try {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY)
    if (!storedTodos) {
      return []
    }

    const parsedTodos = JSON.parse(storedTodos)
    return Array.isArray(parsedTodos)
      ? parsedTodos.filter((todo): todo is string => typeof todo === 'string')
      : []
  } catch {
    return []
  }
}

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<string[]>(() => loadTodos())

  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextTodo = todoText.trim()
    if (!nextTodo) {
      return
    }

    setTodos((currentTodos) => [...currentTodos, nextTodo])
    setTodoText('')
  }

  return (
    <main className="app-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Sandcastle task board</p>
        <h1>Track todos in one focused workspace</h1>
        <p className="lede">Add a task, see it appear in the list, and keep momentum going.</p>
      </section>

      <section className="panel todo-panel" aria-labelledby="todo-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Todo input</p>
            <h2 id="todo-heading">Create a new todo</h2>
          </div>
          <span className="status-pill">{todos.length} saved</span>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="todo-label" htmlFor="todo-input">
            New todo
          </label>
          <div className="todo-controls">
            <input
              id="todo-input"
              name="todo"
              type="text"
              value={todoText}
              onChange={(event) => setTodoText(event.target.value)}
              placeholder="Write something worth finishing"
            />
            <button type="submit" className="primary-button">
              Add todo
            </button>
          </div>
        </form>

        <ul className="todo-list" aria-label="Todo list">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={`${todo}-${index}`} aria-label={todo} className="todo-item">
                <span className="todo-bullet" aria-hidden="true" />
                <span>{todo}</span>
              </li>
            ))
          ) : (
            <li className="todo-empty">No todos yet. Add the first one above.</li>
          )}
        </ul>
      </section>
    </main>
  )
}

export default App
