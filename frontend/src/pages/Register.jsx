import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone must be 10 to 15 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password don't match")
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
          fullname: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values, { setTouched, validateForm }) => {
          // On submit, touch all fields to show all errors
          validateForm().then((errors) => {
            if (Object.keys(errors).length > 0) {
              setTouched({
                fullname: true,
                email: true,
                phone: true,
                password: true,
                confirmPassword: true,
              });
            } else {
              alert(JSON.stringify(values, null, 2));
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <div className="mb-2">
              <div style={labelStyle}>Fullname</div>
              <Field
                name="fullname"
                type="text"
                className="form-control"
                style={inputStyle}
                autoComplete="off"
              />
              {touched.fullname && errors.fullname && (
                <div
                  style={{
                    color: "#f25d2a",
                    fontSize: 13,
                    marginTop: 2,
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {errors.fullname}
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
                autoComplete="off"
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
                autoComplete="off"
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
                placeholder=""
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
                placeholder=""
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
