function Pagination({ hasNext, onNext, loading, productCount = 0 }) {
  // Ensure productCount is a valid number
  const count = typeof productCount === 'number' && productCount >= 0 ? productCount : 0;
  
  return (
    <div className="pagination-controls">
      <p className="pagination-info">
        {count > 0 ? `Showing ${count} products` : 'No products to display'}
      </p>

      <div className="pagination-actions">
        {!hasNext && count > 0 && <span className="end-note">You've reached the end</span>}
        <button type="button" onClick={onNext} disabled={!hasNext || loading} className="btn-primary">
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
