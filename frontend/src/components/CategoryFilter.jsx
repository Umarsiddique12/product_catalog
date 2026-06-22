function CategoryFilter({ categories, value, onChange, productCount }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Filter by Category</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          {productCount === 0 ? 'No products loaded yet' : `${productCount} product${productCount === 1 ? '' : 's'} shown`}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="category-select" className="text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category-select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        >
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
