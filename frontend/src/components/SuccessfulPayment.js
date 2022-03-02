import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const Successful = () => {
    return (
        <div className="successful-payment">
            <h2>Thank you for your purchase</h2>
            <p>We are getting it ready!</p>
            <p>
                Forgot to order something? Back to{" "}
                <Link to={"/menu"}>Menu</Link>
            </p>
        </div>
    );
};

const SuccessfulPayment = () => {
    const stripe = useStripe();
    const [status, setStatus] = useState(null);
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
                    setStatus("success");
                    dispatch({ type: "CLEAR_CART" });
                    break;

                case "processing":
                    setStatus("processing");
                    break;

                case "requires_payment_method":
                    setStatus("failed payment");
                    break;
                default:
                    setStatus("other");
                    break;
            }
        });
    }, [stripe]);
    return (
        <>
            <div>
                {!status && (
                    <Row>
                        <div className="spinner"></div>
                    </Row>
                )}
                {status === "success" && (
                    <>
                        <Successful />
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </>
                )}
                {status === "processing" && <p>processing...</p>}
                {status === "failed payment" && (
                    <p>
                        Sorry for the inconvenience, but it looks like your
                        payment didn't go through.
                    </p>
                )}
                {status === "other" && <p>Oops something went wrong.</p>}
            </div>
        </>
    );
};

export default SuccessfulPayment;
