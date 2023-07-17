const Product = require("../model/Product");
const Category = require("../model/Category");

module.exports = class ProductController {
  static async allProducts(req, res) {
    try {
      let searchQuery = { title: new RegExp(req.query.title, "i") };
      const allProducts = await Product.find(searchQuery).sort({
        _id: -1,
      });
      res.status(200).json(allProducts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createProduct(req, res) {
    try {
      const newData = await Product.create(req.body);
      res.status(201).json(newData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async productById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.findByIdAndRemove(id);

      res.status(200).json({ message: "success delete" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateProduct(req, res) {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "updage successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async allCategories(_, res) {
    try {
      const allCategory = await Category.find();
      res.status(200).json(allCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async productByCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      const products = await Product.find({ category: category.name });
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
