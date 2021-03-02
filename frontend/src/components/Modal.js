import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemForm from "./ItemForm";
import ToastNotification from "./ToastNotification";

const backDrop = {
  hidden: { opacity: 0, transition: { duration: 0.5 } },
  visible: { opacity: 1 },
};

const Modal = ({ selectedItem, showModal, setShowModal }) => {
  const [show, setShow] = useState(false);

  console.log(selectedItem);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="backDrop"
          variants={backDrop}
          inital={"hidden"}
          animate={"visible"}
          exit={"hidden"}
        >
          <ItemForm setShowToast={setShow} setShowModal={setShowModal} />
          <ToastNotification show={show} setShow={setShow} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
