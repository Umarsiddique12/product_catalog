function CategoryFilter({ categories, value, onChange, productCount = 0 }) {
  // Ensure productCount is a valid number and categories is an array
  const count = typeof productCount === 'number' && productCount >= 0 ? productCount : 0;
  const cats = Array.isArray(categories) ? categories : [];
  
  return (
    <div className="category-filter-bar">
      <div className="filter-info">
        <h2 className="filter-title">Filter by Category</h2>
        <p className="filter-sub">{count === 0 ? 'No products loaded yet' : `${count} product${count === 1 ? '' : 's'} shown`}</p>
      </div>
      <div className="filter-controls">
        <label htmlFor="category-select" className="filter-label">Category</label>
        <select id="category-select" value={value} onChange={(e) => onChange(e.target.value)} className="filter-select">
          {cats.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CategoryFilter;
