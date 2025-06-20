import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const logo = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#f25d2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 20,
        marginRight: 8,
      }}
    >
      P
    </div>
    <span style={{ color: "#f25d2a", fontWeight: 500, fontSize: 15 }}>
      Product Hunt
    </span>
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await api.post("/api/auth/login", values);
      localStorage.setItem("token", res.data.token); // Save the token
      navigate("/products"); // Redirect to products page
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setFieldError("password", err.response.data.msg);
      } else {
        console.error(err);
        alert("An error occurred during login.");
      }
    }
    setSubmitting(false);
  };

  const inputStyle = {
    height: 44,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginBottom: 0,
    backgroundColor: "#ffffff",
  };

  const labelStyle = {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 4,
    marginTop: 18,
    textAlign: "left",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafbfc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 32,
          width: 370,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {logo}
        <div style={{ height: 24 }} />
        <h3 className="text-center" style={{ fontWeight: 500 }}>
          Login
        </h3>
        <p className="text-center text-muted mb-4">Welcome back</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form autoComplete="off">
              <div className="mb-2">
                <div style={labelStyle}>Email</div>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  style={inputStyle}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <div
                    style={{
                      color: "#f25d2a",
                      fontSize: 13,
                      marginTop: 2,
                      fontWeight: 600,
                      textAlign: "left",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <div style={labelStyle}>Password</div>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  style={inputStyle}
                  autoComplete="current-password"
                />
                {touched.password && errors.password && (
                  <div
                    style={{
                      color: "#f25d2a",
                      fontSize: 13,
                      marginTop: 2,
                      fontWeight: 600,
                      textAlign: "left",
                    }}
                  >
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                style={{ height: 44, fontSize: 16 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
