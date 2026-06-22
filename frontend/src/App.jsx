import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import CategoryFilter from './components/CategoryFilter';
import ProductTable from './components/ProductTable';
import Pagination from './components/Pagination';
import AddProduct from './components/AddProduct';
import { fetchProducts } from './services/api';

const CATEGORIES = ['All', 'Electronics', 'Books', 'Clothing', 'Sports', 'Home'];

const navLinkClass = ({ isActive }) =>
  [
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-indigo-600 text-white shadow-sm'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  ].join(' ');

function App() {
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const loadProducts = async (cursor = null, selectedCategory = category, newProduct = null) => {
    setLoading(true);

    try {
      const response = await fetchProducts({ category: selectedCategory, cursor });
      
      // Validate response structure
      const responseProducts = Array.isArray(response.products) ? response.products : [];
      
      let items = cursor && Array.isArray(products) 
        ? [...products, ...responseProducts] 
        : responseProducts;

      // If a newly created product was passed via navigation state, ensure it's on top
      if (newProduct) {
        const exists = items.some((p) => p._id === newProduct._id);
        if (!exists) items = [newProduct, ...items];
      }

      setProducts(items);
      setNextCursor(response.nextCursor || null);
    } catch (error) {
      console.error('Error loading products:', error.message);
      // Show user-friendly error but keep existing data
      alert('Error loading products: ' + error.message);
      setProducts([]);
      setNextCursor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setNextCursor(null);
    const newProduct = location.state && location.state.newProduct ? location.state.newProduct : null;
    loadProducts(null, category, newProduct);
    // clear navigation state after using it
    if (location.state && location.state.newProduct) {
      window.history.replaceState({}, document.title, location.pathname + location.search);
    }
  }, [category, location.pathname, location.search]);

  const handleNextPage = () => {
    if (!nextCursor) return;
    loadProducts(nextCursor);
  };

  return (
    <div className="app-background">
      <div className="container">
        <header className="site-header">
          <div className="site-header-inner">
            <div>
              <p className="eyebrow">Inventory Manager</p>
              <h1 className="site-title">Product Catalog</h1>
              <p className="lead">Browse, filter, and add products to your catalog.</p>
            </div>
            <nav className="site-nav">
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Product List
              </NavLink>
              <NavLink to="/add-product" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Add Product
              </NavLink>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  <CategoryFilter
                    categories={CATEGORIES}
                    value={category}
                    onChange={(value) => setCategory(value)}
                    productCount={products.length}
                  />
                  <ProductTable products={products} loading={loading && products.length === 0} />
                  <Pagination
                    hasNext={Boolean(nextCursor)}
                    onNext={handleNextPage}
                    loading={loading}
                    productCount={products.length}
                  />
                </div>
              }
            />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
