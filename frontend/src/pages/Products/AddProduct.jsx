import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ProductModal from "../../components/ProductModal";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    banner: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real app, submit formData to backend or state
    console.log("Submitted product:", formData);
    setShowModal(false);
    setFormData({ name: "", banner: "", description: "", price: 0 });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-circle me-2"></i>Add Product
      </Button>
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        title="Add New Product"
        submitLabel="Add Product"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="text"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              placeholder="Enter banner url"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
            />
          </Form.Group>
        </Form>
      </ProductModal>
    </>
  );
};

export default AddProduct;
