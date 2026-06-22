const CATEGORY_COLORS = {
  Electronics: 'bg-violet-100 text-violet-700',
  Books: 'bg-amber-100 text-amber-700',
  Clothing: 'bg-pink-100 text-pink-700',
  Sports: 'bg-emerald-100 text-emerald-700',
  Home: 'bg-sky-100 text-sky-700'
};

function CategoryBadge({ category }) {
  const colorClass = CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-700';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${colorClass}`}>
      {category}
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 px-6 py-4">
          <div className="h-4 flex-1 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

function ProductTable({ products, loading }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!loading &&
              products.map((product) => (
                <tr key={product._id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{product.name}</td>
                  <td className="px-6 py-4">
                    <CategoryBadge category={product.category} />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold tabular-nums text-slate-900">
                    ${product.price.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {loading && <LoadingSkeleton />}

      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <svg
              className="h-6 w-6 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-900">No products found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different category or add a new product.</p>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
