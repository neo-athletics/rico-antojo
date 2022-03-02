import React from "react";
import { motion, useCycle } from "framer-motion";
import NavLinks from "./NavLinks";
import MobileToggle from "./MobileToggle";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(30px at 260px 40px)",

        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

let navVariants = {
    open: {
        zIndex: 1,
    },
    closed: {
        zIndex: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

const MobileNav = ({ size, setShow }) => {
    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <motion.nav
            variants={navVariants}
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            <motion.div className="background" variants={sidebar} />
            <NavLinks size={size} setShow={setShow} isOpen={isOpen} />
            <MobileToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};

export default MobileNav;
