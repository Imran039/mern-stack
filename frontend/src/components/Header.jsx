import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Listen for storage changes (e.g., login/logout in other tabs)
  window.addEventListener("storage", () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  });

  const handleLoginClick = () => {
    // Autofill demo credentials and navigate to login page
    localStorage.setItem(
      "demoLogin",
      JSON.stringify({
        email: "demo@example.com",
        password: "password123",
      })
    );
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-grey navbar-thin fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ProdManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Nav
              className="mx-auto"
              style={{ flex: 1, justifyContent: "center", display: "flex" }}
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto" style={{ flex: 0 }}>
              {isLoggedIn ? (
                <Button
                  variant="outline-danger"
                  onClick={handleLogoutClick}
                  className="ms-2"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  onClick={handleLoginClick}
                  className="ms-2"
                >
                  Login
                </Button>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
