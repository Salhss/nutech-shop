const { model, Schema } = require("mongoose");
const Product = require("./Product");

const categorySchema = new Schema(
  {
    name: String,
  },
  { collection: "CategoryDb" }
);

module.exports = model("Category", categorySchema);
