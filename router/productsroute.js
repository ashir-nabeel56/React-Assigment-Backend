const express = require("express");
const router = express.Router();

const Product = require("../models/products");
const productsData = require("../data/product.json");

// SEED PRODUCTS - Production par call karo data load karne ke liye
router.post("/seed", async (req, res) => {
  try {
    const products = [];

    // New Arrivals
    productsData.newArrivals.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "newArrivals",
      });
    });

    // Top Selling
    productsData.topSelling.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "topSelling",
      });
    });

    // You Might Also Like
    productsData.youMightAlsoLike.forEach((product) => {
      products.push({
        productId: String(product.id),
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
        imageUrl: product.imageUrl,
        section: "youMightAlsoLike",
      });
    });

    // Categories
    const categories = ["casual", "formal", "party", "gym"];

    categories.forEach((category) => {
      productsData[category].forEach((product) => {
        products.push({
          productId: String(product.id),
          title: product.title,
          price: product.price,
          oldPrice: product.originalPrice || product.oldPrice,
          discount: product.discount,
          rating: product.rating,
          imageUrl: product.imageUrl,
          description: product.description || "",
          category: category,
          section: "category",
        });
      });
    });

    // Existing products remove
    await Product.deleteMany({});

    // Products MongoDB mein insert
    await Product.insertMany(products);

    res.status(200).json({
      message: "Products seeded successfully!",
      totalProducts: products.length,
    });
  } catch (error) {
    console.log("SEED ERROR:", error.message);
    res.status(500).json({
      message: "Seeding failed",
      error: error.message,
    });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error.message);

    res.status(500).json({
      message: "Products fetch nahi ho sake",
      error: error.message,
    });
  }
});

// GET products by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const products = await Product.find({
      category: categoryName.toLowerCase(),
    });

    res.status(200).json(products);
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error.message);

    res.status(500).json({
      message: "Category products fetch nahi ho sake",
      error: error.message,
    });
  }
});

// POST - Add new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error.message);

    res.status(500).json({
      message: "Product add nahi ho saka",
      error: error.message,
    });
  }
});
module.exports = router;