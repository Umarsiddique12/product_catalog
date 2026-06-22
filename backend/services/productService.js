const mongoose = require('mongoose');
const Product = require('../models/Product');
const { parseCursor, createCursor } = require('../utils/cursorHelper');

const VALID_CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Sports', 'Home'];

const buildFilter = ({ category }) => {
  const filter = {};

  if (category) {
    filter.category = category;
  }

  return filter;
};

const fetchProducts = async ({ category, cursor, limit }) => {
  const filter = buildFilter({ category });
  const decodedCursor = parseCursor(cursor);

  if (decodedCursor) {
    const { updatedAt, _id } = decodedCursor;
    filter.$or = [
      { updatedAt: { $lt: updatedAt } },
      { updatedAt, _id: { $lt: _id } }
    ];
  }

  const products = await Product.find(filter)
    .sort({ updatedAt: -1, _id: -1 })
    .limit(limit + 1)
    .lean();

  let nextCursor = null;
  let trimmedProducts = products;

  if (products.length > limit) {
    const lastProduct = products[limit - 1];
    trimmedProducts = products.slice(0, limit);
    nextCursor = createCursor(lastProduct.updatedAt, lastProduct._id);
  }

  return {
    products: trimmedProducts,
    nextCursor
  };
};

const createProduct = async ({ name, category, price }) => {
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const numericPrice = Number(price);

  if (!trimmedName) {
    const error = new Error('Product name is required');
    error.status = 400;
    throw error;
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    const error = new Error('Category is required and must be valid');
    error.status = 400;
    throw error;
  }

  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    const error = new Error('Price is required and must be a positive number');
    error.status = 400;
    throw error;
  }

  const product = new Product({
    name: trimmedName,
    category,
    price: numericPrice
  });

  await product.save();
  return product.toObject();
};

module.exports = {
  fetchProducts,
  createProduct
};
