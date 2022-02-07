import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useElements,
    useStripe,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Container>
            <Link to="/cart">Back to Cart</Link>
            {cart.map((item) => {
                return (
                    <>
                        <p>
                            {item.description} x {item.quantity} $
                            {parseFloat(item.price * item.quantity).toFixed(2)}
                        </p>
                    </>
                );
            })}
            <span>
                Total $
                {userStatus.status === "success"
                    ? discount
                    : parseFloat(cart.reduce(reducer, 0.0)).toFixed(2)}
            </span>
            <div>
                <p>
                    The following payment method is for testing purposes. Please
                    use the following card numbers for your testing.
                </p>
                <p>
                    For a successful payment use the following number: 4242 4242
                    4242 4242
                </p>
                <p>
                    For a failed payment use the following number: 4000 0000
                    0000 9995
                </p>
                <ul>
                    <li>Enter any future date for card expiry.</li>
                    <li>Enter any 3-digit number for CVC.</li>
                    <li>Enter any billing postal code.</li>
                </ul>
            </div>
            <Col lg={9}>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button
                        type="submit"
                        disabled={
                            isLoading || !stripe || !elements || cart.length > 0
                                ? false
                                : true
                        }
                    >
                        {/* create spinner  */}
                        {isLoading ? (
                            <Row>
                                <div className="spinner"></div>
                            </Row>
                        ) : (
                            "Pay"
                        )}
                    </button>
                    {message && <div>{message}</div>}
                </form>
            </Col>
        </Container>
    );
};
export default CardSection;
