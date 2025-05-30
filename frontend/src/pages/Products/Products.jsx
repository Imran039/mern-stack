import React from "react";
import AddProduct from "./AddProduct";
import ProductCard from "../../components/ProductCard";
import Empty from "../../components/Empty";
import { Container, Row, Col } from "react-bootstrap";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling over-ear headphones",
    banner:
      "https://res.cloudinary.com/da3w329cx/image/upload/v1683056487/samples/landscapes/nature-mountains.jpg",
    price: 120,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Smart wearable with health tracking",
    banner:
      "https://res.cloudinary.com/da3w329cx/image/upload/v1683056500/cld-sample-5.jpg",
    price: 80,
  },
  {
    id: 3,
    name: "Laptop",
    description: "14-inch Full HD display, 256GB SSD",
    banner:
      "https://res.cloudinary.com/da3w329cx/image/upload/v1683056499/cld-sample-3.jpg",
    price: 600,
  },
];

const Products = () => {
  // In a real app, products would come from state or API
  const products = sampleProducts; // Replace with state if needed

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-end mb-4">
        <AddProduct />
      </div>
      {products.length === 0 ? (
        <Empty message="No products found. Add a new product!" />
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} md={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
