import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function TopBar(props) {
  let navigate = useNavigate();
  return (
    <>
      <Navbar className="bg-dark bg-gradient" variant="dark">
        <Container fluid className="mx-4">
          <Navbar.Brand onClick={() => navigate("/")}>FoodApp</Navbar.Brand>
          <Nav className="gap-3">
            <Button
              className="bg-dark bg-gradient"
              variant="outline-secondary"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              className="bg-dark bg-gradient"
              variant="outline-secondary"
              onClick={() => navigate("/user-cart")}
            >
              Cart ({props.value.cart.length})
            </Button>
            <Button
              className="bg-dark bg-gradient"
              variant="outline-secondary"
              onClick={() => navigate("/orders")}
            >
              Orders
            </Button>
            <Button
              className="bg-dark bg-gradient"
              variant="outline-secondary"
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="30"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
