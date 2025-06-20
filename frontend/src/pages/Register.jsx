import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone must be 10 to 15 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm your password"),
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

const Register = () => (
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
      <h3
        className="text-center mb-3"
        style={{ fontWeight: 500, marginBottom: 24 }}
      >
        Sign Up
      </h3>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const { name, email, phone, password } = values;
            const res = await api.post("/api/auth/register", {
              name,
              email,
              phone,
              password,
            });
            console.log(res.data); // Handle successful registration (e.g., redirect)
            alert("Registration successful!");
          } catch (err) {
            if (err.response && err.response.data.msg) {
              setFieldError("email", err.response.data.msg);
            } else {
              console.error(err);
              alert("An error occurred during registration.");
            }
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            <div className="mb-2">
              <div style={labelStyle}>Name</div>
              <Field
                name="name"
                type="text"
                className="form-control"
                style={inputStyle}
                autoComplete="name"
              />
              {touched.name && errors.name && (
                <div
                  style={{
                    color: "#f25d2a",
                    fontSize: 13,
                    marginTop: 2,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {errors.name}
                </div>
              )}
            </div>
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
              <div style={labelStyle}>Phone</div>
              <Field
                name="phone"
                type="text"
                className="form-control"
                style={inputStyle}
                autoComplete="tel"
              />
              {touched.phone && errors.phone && (
                <div
                  style={{
                    color: "#f25d2a",
                    fontSize: 13,
                    marginTop: 2,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {errors.phone}
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
                autoComplete="new-password"
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
            <div className="mb-3">
              <div style={labelStyle}>Confirm Password</div>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
                style={inputStyle}
                autoComplete="new-password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div
                  style={{
                    color: "#f25d2a",
                    fontSize: 13,
                    marginTop: 2,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                background: "#1877f2",
                border: 0,
                fontWeight: 500,
                height: 44,
                fontSize: 16,
              }}
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default Register;
