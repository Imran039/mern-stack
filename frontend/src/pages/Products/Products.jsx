import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import ProductCard from "../../components/ProductCard";
import Empty from "../../components/Empty";
import {
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { fetchProducts, updateProduct, deleteProduct } from "./productsActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const editValidationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
  banner: Yup.string().url("Enter a valid URL").required("Banner is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
});

const Products = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
    success,
    totalPages,
    currentPage,
  } = useSelector((state) => state.products);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt");

  useEffect(() => {
    dispatch(fetchProducts({ keyword: search, page: 1, sort }));
  }, [dispatch, search, sort]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: "CLEAR_PRODUCT_STATUS" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_PRODUCT_STATUS" });
    }
  }, [success, error]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handleEditSubmit = (values, { setSubmitting }) => {
    dispatch(
      updateProduct(selectedProduct._id, {
        title: values.title,
        image: values.banner,
        description: values.description,
        price: Number(values.price),
      })
    );
    setEditModal(false);
    setSubmitting(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteProduct(selectedProduct._id));
    setDeleteModal(false);
  };

  const handlePageChange = (page) => {
    dispatch(fetchProducts({ keyword: search, page, sort }));
  };

  return (
    <Container
      fluid
      className="products-container"
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div style={{ paddingTop: "2rem", paddingBottom: "1rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <div className="d-flex align-items-center" style={{ gap: "1rem" }}>
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <Form.Control
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRight: "none" }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "white", borderLeft: "none" }}
                >
                  <FaSearch />
                </span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <Form.Control
                as="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  width: "150px",
                  appearance: "none",
                  paddingRight: "2rem",
                }}
              >
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </Form.Control>
              <FaChevronDown
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#6c757d",
                }}
              />
            </div>
          </div>
          <div>
            <AddProduct />
          </div>
        </div>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        )}
        {!loading && products.length === 0 ? (
          <Empty message="No products found. Add a new product!" />
        ) : products.length <= 2 ? (
          <div
            className="products-grid"
            style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          >
            {products.map((product) => (
              <div key={product._id} style={{ maxWidth: 350, width: "100%" }}>
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <Row className="g-4 justify-content-center products-grid">
            {products.map((product) => (
              <Col key={product._id} md={4}>
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
        )}
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              {[...Array(totalPages).keys()].map((x) => (
                <Pagination.Item
                  key={x + 1}
                  active={x + 1 === currentPage}
                  onClick={() => handlePageChange(x + 1)}
                >
                  {x + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </div>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={
            selectedProduct
              ? {
                  title: selectedProduct.title || "",
                  image: selectedProduct.image || "",
                  description: selectedProduct.description || "",
                  price: selectedProduct.price || "",
                }
              : {
                  title: "",
                  image: "",
                  description: "",
                  price: "",
                }
          }
          enableReinitialize
          validationSchema={editValidationSchema}
          onSubmit={handleEditSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter product name"
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter banner url"
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditModal(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Delete Modal */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selectedProduct?.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;
