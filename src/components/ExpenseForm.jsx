import { useEffect, useState } from 'react'
import { CATEGORIES } from '../categories.js'

const emptyForm = {
  description: '',
  amount: '',
  category: CATEGORIES[0],
  date: new Date().toISOString().slice(0, 10),
}

export default function ExpenseForm({ editingExpense, onAdd, onUpdate, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date,
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [editingExpense])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const description = form.description.trim()
    const amount = Number(form.amount)

    if (!description) {
      setError('Description is required.')
      return
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be a positive number.')
      return
    }

    const payload = { description, amount, category: form.category, date: form.date }

    if (editingExpense) {
      onUpdate({ ...payload, id: editingExpense.id })
    } else {
      onAdd(payload)
      setForm(emptyForm)
    }
    setError('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Description
          <input
            name="description"
            type="text"
            placeholder="e.g. Groceries"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingExpense ? 'Save changes' : 'Add expense'}
        </button>
        {editingExpense && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
