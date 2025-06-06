// Vercel Serverless Function: /api/products/index.js

let products = [];
let nextId = 1;

export default function handler(req, res) {
  if (req.method === "GET") {
    // List all products
    res.status(200).json(products);
  } else if (req.method === "POST") {
    // Create a new product
    const { title, image, description, price } = req.body;
    if (
      !title ||
      !image ||
      !description ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({ message: "Invalid product data" });
    }
    const product = { id: nextId++, title, image, description, price };
    products.push(product);
    res.status(201).json(product);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
