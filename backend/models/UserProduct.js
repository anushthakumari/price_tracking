const mongoose = require("mongoose");
const { Schema } = mongoose;

const userProductSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

userProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

const UserProduct = mongoose.model("UserProduct", userProductSchema);
module.exports = UserProduct;
