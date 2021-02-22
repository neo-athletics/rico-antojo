import React from "react";
import Toast from "react-bootstrap/Toast";
import { useSelector } from "react-redux";
const ToastNotification = ({ setShow, show }) => {
  const cart = useSelector((state) => state.cart);
  console.log(cart[cart.length - 1]);
  const item = cart[cart.length - 1] ?? {};

  return (
    <Toast
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
      onClose={() => setShow(false)}
      show={show}
      delay={2000}
      autohide
    >
      <Toast.Header>{item.description}</Toast.Header>
      <Toast.Body>
        qty: {item.quantity} ea.{item.price}
      </Toast.Body>
    </Toast>
  );
};

export default ToastNotification;
