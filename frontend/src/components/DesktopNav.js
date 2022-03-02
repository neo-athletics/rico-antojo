import React from "react";
import { motion, useCycle } from "framer-motion";
import NavLinks from "./NavLinks";
const DesktopNav = ({ size, setShow }) => {
    return (
        <motion.nav className="desktop-nav">
            <NavLinks size={size} setShow={setShow} />
        </motion.nav>
    );
};

export default DesktopNav;
