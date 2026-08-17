import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<string[]>([])

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
        <h1>Track a todo and keep the counter handy</h1>
        <p className="lede">
          Add a task, see it appear in the list, and use the counter buttons from the
          previous issue.
        </p>
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

      <section className="panel counter-panel" aria-labelledby="counter-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Counter</p>
            <h2 id="counter-heading">Keep the existing count flow</h2>
          </div>
          <span className="status-pill">Current total</span>
        </div>

        <div className="counter-row">
          <button
            type="button"
            className="counter-button"
            onClick={() => setCount((currentCount) => currentCount + 1)}
          >
            Count is {count}
          </button>
          <button
            type="button"
            className="counter-button secondary"
            onClick={() => setCount((currentCount) => currentCount - 1)}
          >
            Decrease count
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
