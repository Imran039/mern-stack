// // Vercel Serverless Function: /api/products/[id].js

// let products = [];

// export default function handler(req, res) {
//   const id = parseInt(req.query.id);
//   if (isNaN(id)) {
//     return res.status(400).json({ message: "Invalid product id" });
//   }

//   if (req.method === "GET") {
//     const product = products.find((p) => p.id === id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } else if (req.method === "PUT") {
//     const { title, image, description, price } = req.body;
//     if (
//       !title ||
//       !image ||
//       !description ||
//       typeof price !== "number" ||
//       price <= 0
//     ) {
//       return res.status(400).json({ message: "Invalid product data" });
//     }
//     const product = products.find((p) => p.id === id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     product.title = title;
//     product.image = image;
//     product.description = description;
//     product.price = price;
//     res.status(200).json(product);
//   } else if (req.method === "DELETE") {
//     const index = products.findIndex((p) => p.id === id);
//     if (index === -1)
//       return res.status(404).json({ message: "Product not found" });
//     products.splice(index, 1);
//     res.status(200).json({ message: "Product deleted" });
//   } else {
//     res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// Vercel Serverless Function: /api/products/[id].js

export default function handler(req, res) {
  res.status(200).json({ method: req.method, id: req.query.id });
}

