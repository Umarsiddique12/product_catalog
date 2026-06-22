function CategoryFilter({ categories, value, onChange, productCount = 0 }) {
  return (
    <div className="category-filter-bar">
      <div className="filter-info">
        <h2 className="filter-title">Filter by Category</h2>
        <p className="filter-sub">{productCount === 0 ? 'No products loaded yet' : `${productCount} product${productCount === 1 ? '' : 's'} shown`}</p>
      </div>
      <div className="filter-controls">
        <label htmlFor="category-select" className="filter-label">Category</label>
        <select id="category-select" value={value} onChange={(e) => onChange(e.target.value)} className="filter-select">
          {categories.map((categoryName) => (
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
