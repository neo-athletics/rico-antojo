import React from "react";
import { useSelector } from "react-redux";
import SideCart from "./SideCart";
import { logOutAction } from "../actions/logOutAction";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { motion, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";

const NavLinks = ({ setShow, size, isOpen }) => {
    const { cart, userStatus } = useSelector((state) => state);
    const cartLength = cart.length;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogOut = () => {
        dispatch(logOutAction());
        setShow(true);
        history.push("/");
    };

    const variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const variantsLink = {
        open: {
            y: 0,
            opacity: 1,
            display: "block",
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
        closed: {
            y: 50,
            opacity: 0,
            PointerEvent: "none",
            transition: {
                y: { stiffness: 1000 },
            },
            transitionEnd: {
                display: "none",
            },
        },
    };
    console.log(isOpen, " is nav open");
    return (
        <motion.ul variants={variants}>
            <motion.li variants={variantsLink}>
                <Link exact to={"/"}>
                    Home
                </Link>
            </motion.li>
            <motion.li variants={variantsLink}>
                <Link to={"/menu"}>Menu</Link>
            </motion.li>
            <motion.li variants={variantsLink}>
                <Link to={"/about"}>About</Link>
            </motion.li>

            <div className="dropdown nav-item">
                <motion.li variants={variantsLink}>
                    {/* <motion.a href="/cart" className={"cart"}> */}
                    <Link to={"/cart"} className="cart">
                        Cart
                        <span className={"itemCount"}>
                            <span>{cartLength}</span>
                        </span>
                    </Link>
                    {/* </motion.a> */}
                </motion.li>
                <SideCart />
            </div>

            {userStatus.status === "success" && (
                <motion.li variants={variantsLink}>
                    <Link to={"#"} onClick={handleLogOut}>
                        Log Out
                    </Link>
                </motion.li>
            )}

            {userStatus.status !== "success" && (
                <LayoutGroup>
                    <motion.li layout variants={variantsLink}>
                        <Link to={"/signup"}>Sign Up</Link>
                    </motion.li>
                    <motion.li layout variants={variantsLink}>
                        <Link to={"/login"}>Log In</Link>
                    </motion.li>
                </LayoutGroup>
            )}

            {userStatus.status !== "success" && <></>}
        </motion.ul>
    );
};

export default NavLinks;
