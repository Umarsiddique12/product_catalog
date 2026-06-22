import { Fragment } from 'react';

const CATEGORY_COLORS = {
  Electronics: 'category-electronics',
  Books: 'category-books',
  Clothing: 'category-clothing',
  Sports: 'category-sports',
  Home: 'category-home'
};

function CategoryBadge({ category }) {
  const cls = CATEGORY_COLORS[category] || 'category-default';
  return <span className={`category-badge ${cls}`}>{category}</span>;
}

function LoadingSkeleton() {
  return (
    <div className="skeleton-list">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="skeleton-row" key={i} />
      ))}
    </div>
  );
}

function formatPrice(price) {
  try {
    return Number(price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  } catch (e) {
    return `₹${Number(price).toFixed(2)}`;
  }
}

function formatDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}

function ProductTable({ products, loading = false }) {
  if (loading) return <LoadingSkeleton />;

  // Ensure products is an array
  const productList = Array.isArray(products) ? products : [];

  if (productList.length === 0) {
    return (
      <div className="empty-card">
        <p className="empty-title">No products found</p>
        <p className="empty-sub">Try changing the category or add a new product.</p>
      </div>
    );
  }

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="name-cell">
                  <div className="name-title">{product.name}</div>
                  <div className="name-meta">ID: {product._id}</div>
                </div>
              </td>
              <td>
                <CategoryBadge category={product.category} />
              </td>
              <td>{formatPrice(product.price)}</td>
              <td>{formatDate(product.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
