import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ProductModal from "../../components/ProductModal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "./productsActions";
import "bootstrap-icons/font/bootstrap-icons.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Product title is required"),
  image: Yup.string().url("Enter a valid URL").required("Image is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
});

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  const initialValues = {
    title: "",
    image: "",
    description: "",
    price: "",
  };

  useEffect(() => {
    if (showModal === false) {
      // Optionally reset form or state here
    }
  }, [showModal]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      createProduct({
        title: values.title,
        image: values.image,
        description: values.description,
        price: Number(values.price),
      })
    );
    resetForm();
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-circle me-2"></i>Add Product
      </Button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <ProductModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            title="Add New Product"
            submitLabel={loading ? "Adding..." : "Add Product"}
          >
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter product title"
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter image url"
                  isInvalid={touched.image && !!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter product description"
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={0}
                  placeholder="Enter price"
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </ProductModal>
        )}
      </Formik>
    </>
  );
};

export default AddProduct;
