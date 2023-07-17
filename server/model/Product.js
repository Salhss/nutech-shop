const { model, Schema } = require("mongoose");
const Category = require("./Category");

const productSchema = new Schema(
  {
    title: String,
    description: String,
    sellPrice: String,
    buyPrice: String,
    description: String,
    stock: String,
    thumbnail: String,
    category: String,
  },
  { collection: "ProductDb" }
);

module.exports = model("Product", productSchema);
