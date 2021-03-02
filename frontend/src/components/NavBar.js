import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideCart from "./SideCart";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const NavBar = () => {
  const cartLength = useSelector((state) => state.cart.length);

  return (
    <Navbar bg="primary" variant="dark" className="mb-5">
      <Navbar.Brand href="#home">Rico Antojo</Navbar.Brand>
      <Container className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/menu">
            Menu
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <div className="dropdown nav-item">
            <Nav.Link as={Link} to="/cart" className={"cart"}>
              Cart
              <span className={"itemCount"}>
                <span>{cartLength}</span>
              </span>
            </Nav.Link>
            <SideCart />
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
