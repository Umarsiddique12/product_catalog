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

  const loadProducts = async (cursor = null, selectedCategory = category) => {
    setLoading(true);

    try {
      const response = await fetchProducts({ category: selectedCategory, cursor });
      setProducts((current) => (cursor ? [...current, ...response.products] : response.products));
      setNextCursor(response.nextCursor);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setNextCursor(null);
    loadProducts(null, category);
  }, [category, location.pathname, location.search]);

  const handleNextPage = () => {
    if (!nextCursor) return;
    loadProducts(nextCursor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Inventory Manager</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Product Catalog
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Browse, filter, and add products to your catalog.
              </p>
            </div>
            <nav className="flex gap-2 rounded-xl bg-slate-100 p-1">
              <NavLink to="/" end className={navLinkClass}>
                Product List
              </NavLink>
              <NavLink to="/add-product" className={navLinkClass}>
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
