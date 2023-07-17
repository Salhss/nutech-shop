const { MongoClient } = require("mongodb");
const docs = require("../data/product.json");

const dbUrl = process.env.DB_URL;

const client = new MongoClient(dbUrl);

async function run() {
  try {
    const database = client.db("nutech-shop");

    const product = database.collection("ProductDb");
    // const categories = database.collection("CategoryDb");

    const option = { ordered: true };

    const resultProduct = await product.insertMany(docs.products, option);
    // const resultCategories = await categories.insertMany(docs.category, option);

    console.log(resultProduct);
    // console.log(resultCategories);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
