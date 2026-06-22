const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const { category, cursor, limit } = req.query;
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const result = await productService.fetchProducts({
      category,
      cursor,
      limit: pageSize
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  createProduct
};
