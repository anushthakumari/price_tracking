const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    imageSrc: {
      type: String,
      trim: true,
    },

    productSource: {
      type: String,
      required: true,
    },

    currencySymbol: {
      type: String,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    lastChecked: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
