export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-main">
        <span className="expense-description">{expense.description}</span>
        <span className="expense-meta">
          <span className="badge">{expense.category}</span>
          <span className="expense-date">{expense.date}</span>
        </span>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
        <button type="button" className="btn btn-small" onClick={() => onEdit(expense.id)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-danger"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
