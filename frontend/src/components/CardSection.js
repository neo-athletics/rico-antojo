import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CardSection = () => {
    const cart = useSelector((state) => state.cart);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const fetchData = async () => {
        const res = await axios.post(
            "http://localhost:8080/create-payment-intent",
            { items: [...cart] }
        );
        const { data } = await res;
        const { clientSecret } = await data;
        setClientSecret(clientSecret);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const reducer = (accu, curr) => {
        return accu + curr.price * curr.quantity;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            console.log(payload.error);
        } else {
            console.log(payload);
        }
    };
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
                Total ${parseFloat(cart.reduce(reducer, 0.0)).toFixed(2)}
            </span>
            <Col lg={9}>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" disabled={!stripe}>
                        Pay
                    </button>
                </form>
            </Col>
        </Container>
    );
};
export default CardSection;
