import React from "react";
import { motion } from "framer-motion";
import { item } from "./LogIn";
import Wave from "./Wave";
import WaveLayout from "./WaveLayout";

const About = () => {
    let variants = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
                duration: 0.2,
            },
        },
        hidden: { opacity: 0 },
    };
    return (
        <>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                className="about-container"
            >
                <motion.h1 variants={item}>About Us</motion.h1>
                <motion.p variants={item}>
                    Ipsum culpa veniam laborum amet irure Lorem dolore in.
                    Voluptate non amet do Lorem non non duis. Pariatur sint et
                    cupidatat velit ea qui sint officia aute cillum ullamco.
                    Ipsum nulla cupidatat laboris culpa labore enim consectetur
                    ullamco aliquip aliqua quis enim. Amet exercitation enim
                    laboris sunt labore cillum ex.
                </motion.p>
            </motion.div>
            <WaveLayout />
        </>
    );
};

export default About;
