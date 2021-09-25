import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router";
import SideCart from "./SideCart";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actions/logOutAction";

const NavBar = ({ setShow }) => {
    const { cart, userStatus } = useSelector((state) => state);
    const history = useHistory();
    const cartLength = cart.length;
    const logOutMessage = {
        header: "Logged Out",
        body: "Good Bye",
        loggedIn: false,
    };

    console.log(userStatus, "nav");

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutAction(logOutMessage));
        setShow(true);
        history.push("/");
    };

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
                    {!userStatus.status && (
                        <>
                            <Nav.Link as={Link} to="/signup">
                                Sign Up
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                Log In
                            </Nav.Link>
                        </>
                    )}
                    {userStatus.status === "success" && (
                        <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
