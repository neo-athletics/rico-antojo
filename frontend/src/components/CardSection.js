import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useElements,
    useStripe,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import WaveLayout from "./WaveLayout";

const CardSection = () => {
    const { cart, userStatus } = useSelector((state) => state);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const reducer = (accu, curr) => {
        return accu + curr.price * curr.quantity;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/successful_payment",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error happened");
        }

        setIsLoading(false);
    };

    const discount = parseFloat(
        cart.reduce(reducer, 0.0) - cart.reduce(reducer, 0.0) * 0.1
    ).toFixed(2);

    return (
        <>
            <Container className="content-container">
                <Link to="/cart">Back to Cart</Link>
                <h3 className="items-title">Items</h3>
                <Col className="checkout-cart">
                    {cart.map((item) => {
                        return (
                            <>
                                <p>
                                    {item.description} x {item.quantity} $
                                    {parseFloat(
                                        item.price * item.quantity
                                    ).toFixed(2)}
                                </p>
                            </>
                        );
                    })}
                    <p>
                        <span>
                            Total $
                            {userStatus.status === "success"
                                ? discount
                                : parseFloat(cart.reduce(reducer, 0.0)).toFixed(
                                      2
                                  )}
                        </span>
                    </p>
                </Col>
                <h3>Payment Details</h3>
                <Col className="checkout-details">
                    <p>
                        The following payment method is for testing purposes.
                        Please use the following card numbers.
                    </p>
                    <p>
                        For a successful payment use the following number: 4242
                        4242 4242 4242
                    </p>
                    <p>
                        For a failed payment use the following number: 4000 0000
                        0000 9995
                    </p>
                    <ul>
                        <li>
                            <i class="fa-solid fa-asterisk"></i>
                            Enter any future date for card expiry.
                        </li>
                        <li>
                            <i class="fa-solid fa-asterisk"></i>
                            Enter any 3-digit number for CVC.
                        </li>
                        <li>
                            <i class="fa-solid fa-asterisk"></i>
                            Enter any billing postal code.
                        </li>
                    </ul>
                </Col>
                <Col style={{ paddingLeft: "0" }} lg={10}>
                    {" "}
                    <h3>Payment</h3>
                    <form onSubmit={handleSubmit}>
                        {message && (
                            <div
                                className="danger"
                                style={{ marginBottom: "10px" }}
                            >
                                {message}
                            </div>
                        )}
                        <PaymentElement />

                        <button
                            className="payment-btn"
                            type="submit"
                            disabled={
                                isLoading ||
                                !stripe ||
                                !elements ||
                                cart.length > 0
                                    ? false
                                    : true
                            }
                        >
                            {isLoading ? (
                                <Row>
                                    <div className="spinner"></div>
                                </Row>
                            ) : (
                                "Pay"
                            )}
                        </button>
                    </form>
                </Col>
            </Container>
            <WaveLayout />
        </>
    );
};
export default CardSection;
