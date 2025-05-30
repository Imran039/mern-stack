import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NAVBAR_HEIGHT = 38; // px

const Hero = () => {
  return (
    <div
      className="home-hero text-white"
      style={{
        position: "absolute",
        left: 0,
        top: NAVBAR_HEIGHT,
        width: "100vw",
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 48,
          padding: 32,
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 className="display-4 fw-bold">Welcome to ProdManage</h1>
          <p className="lead">
            Effortlessly manage your products with our all-in-one tool. <br />
            Create, view, edit, and delete products — fast, simple, and
            reliable.
          </p>
          <Link to="/products">
            <Button variant="light" size="lg" className="mt-3">
              Explore Products
            </Button>
          </Link>
        </div>
        <div style={{ flex: 1, minWidth: 280, textAlign: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1533/1533926.png"
            alt="Product illustration"
            style={{ maxWidth: 300, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
