const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ['Electronics', 'Books', 'Clothing', 'Sports', 'Home']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ updatedAt: -1, _id: -1 });

module.exports = mongoose.model('Product', productSchema);
