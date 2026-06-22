import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Sports', 'Home'];

const inputClass =
  'mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20';

function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setName('');
    setCategory(CATEGORIES[0]);
    setPrice('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!price || Number(price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    setSubmitting(true);

    try {
      const created = await createProduct({
        name: name.trim(),
        category,
        price: Number(price)
      });

      setMessage('Product created successfully. Redirecting...');
      resetForm();

      setTimeout(() => {
        navigate('/?refresh=' + Date.now(), { replace: true, state: { newProduct: created } });
      }, 600);
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message || 'Failed to create product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Add New Product</h2>
          <p className="mt-1 text-sm text-slate-500">Fill in the details below to add a product to the catalog.</p>
        </div>

        <form className="space-y-5 p-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Product Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Wireless Headphones"
              className={inputClass}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Price (₹)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="0.00"
              className={inputClass}
              required
            />
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>

        {message && (
          <div className="mx-6 mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
