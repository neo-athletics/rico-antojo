import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SuccessfulPayment = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    dispatch({ type: "CLEAR_CART" });
                    break;

                case "processing":
                    setMessage("Your payment is processing.");
                    break;

                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);
    return (
        <>
            <div>
                <p>Thank you for your order!</p>
                {!message && (
                    <Row>
                        <div className="spinner"></div>
                    </Row>
                )}
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default SuccessfulPayment;
