import { CATEGORIES } from '../categories.js'

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`chip ${selected === 'All' ? 'chip-active' : ''}`}
        onClick={() => onChange('All')}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${selected === c ? 'chip-active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
