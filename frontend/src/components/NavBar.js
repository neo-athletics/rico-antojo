import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavBar = ({ setShow }) => {
    const [size, setSize] = useState(window.innerWidth);
    const getSize = () => {
        setSize(window.innerWidth);
    };
    window.onresize = getSize;

    return (
        <div style={{ paddingTop: "12px", marginBottom: "40px" }}>
            <Navbar.Brand className="brand-name" href="/">
                Rico Antojo
            </Navbar.Brand>
            {size > 1200 ? (
                <DesktopNav size={size} setShow={setShow} />
            ) : (
                <MobileNav size={size} setShow={setShow} />
            )}
        </div>
    );
};

export default NavBar;
