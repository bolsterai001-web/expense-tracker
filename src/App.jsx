import { useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import ExpenseForm from './components/ExpenseForm.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [filter, setFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)

  const editingExpense = expenses.find((e) => e.id === editingId) ?? null

  const filteredExpenses = useMemo(() => {
    const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date))
    return filter === 'All' ? sorted : sorted.filter((e) => e.category === filter)
  }, [expenses, filter])

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  )

  function handleAdd(expense) {
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }])
  }

  function handleUpdate(updated) {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    setEditingId(null)
  }

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <section className="card">
        <h2>{editingExpense ? 'Edit expense' : 'Add expense'}</h2>
        <ExpenseForm
          editingExpense={editingExpense}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onCancel={() => setEditingId(null)}
        />
      </section>

      <section className="card">
        <div className="list-header">
          <h2>Expenses</h2>
          <span className="total">Total: ${total.toFixed(2)}</span>
        </div>
        <CategoryFilter selected={filter} onChange={setFilter} />
        <ExpenseList expenses={filteredExpenses} onEdit={setEditingId} onDelete={handleDelete} />
      </section>
    </div>
  )
}
