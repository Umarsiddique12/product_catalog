function Pagination({ hasNext, onNext, loading, productCount }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center">
      <p className="text-sm text-slate-500">
        {productCount > 0 ? (
          <>
            Showing <span className="font-medium text-slate-700">{productCount}</span> products
          </>
        ) : (
          'No products to display'
        )}
      </p>

      <div className="flex items-center gap-3">
        {!hasNext && productCount > 0 && (
          <span className="text-sm text-slate-500">You&apos;ve reached the end</span>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading...
            </>
          ) : (
            <>
              Load More
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
