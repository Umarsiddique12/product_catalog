function Pagination({ hasNext, onNext, loading, productCount }) {
  return (
    <div className="pagination-controls">
      <p className="pagination-info">
        {productCount > 0 ? `Showing ${productCount} products` : 'No products to display'}
      </p>

      <div className="pagination-actions">
        {!hasNext && productCount > 0 && <span className="end-note">You've reached the end</span>}
        <button type="button" onClick={onNext} disabled={!hasNext || loading} className="btn-primary">
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
