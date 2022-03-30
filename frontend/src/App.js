import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/style.css";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { Switch, Route } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Menu from "./components/Menu";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogInToast from "./components/LogInToast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardSection from "./components/CardSection";
import axios from "axios";
import { useSelector } from "react-redux";
import SuccessfulPayment from "./components/SuccessfulPayment";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const cart = useSelector((state) => state.cart);
    const [clientSecret, setClientSecret] = useState("");

    const fetchData = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/create-payment-intent",
                { items: [...cart] },
                { withCredentials: true }
            );
            const { data } = await res;
            const { clientSecret } = await data;
            setClientSecret(clientSecret);
        } catch (e) {
            console.log(e);
        }
    };

    // const getCookieSession = (cookieName) => {
    //     let cookie = {};
    //     document.cookie.split(";").forEach(function (el) {
    //         let [key, value] = el.split("=");
    //         cookie[key.trim()] = value;
    //     });
    //     const [sessionId, secondId] = cookie[cookieName].split(".");

    //     let cookieId = sessionId.slice(4);

    //     return cookieId;
    // };

    // const validateCookie = async (cookie) => {
    //     const res = axios.get("http://localhost:8080/validate_cookie", {
    //         cookie,
    //     });

    //     const data = await res;
    // };

    // let isUserActive = async () => {
    //     try {
    //         const res = await axios.get("user");
    //         const { data } = res;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // useEffect(() => {
    //     isUserActive();
    // }, [document.cookie]);

    useEffect(() => {
        if (cart.length >= 1) {
            fetchData();
        }
    }, [cart.length]);

    const options = {
        clientSecret,
    };

    return (
        <div className="App">
            <svg
                className="top-layer-wave"
                viewBox="0 0 900 600"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <path
                    d="M0 180L16.7 183.8C33.3 187.7 66.7 195.3 100 203.5C133.3 211.7 166.7 220.3 200 225.7C233.3 231 266.7 233 300 228.7C333.3 224.3 366.7 213.7 400 205.2C433.3 196.7 466.7 190.3 500 190.3C533.3 190.3 566.7 196.7 600 198.5C633.3 200.3 666.7 197.7 700 190.5C733.3 183.3 766.7 171.7 800 177C833.3 182.3 866.7 204.7 883.3 215.8L900 227L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
                    fill="#99dafd"
                ></path>
                <path
                    d="M0 159L16.7 157.5C33.3 156 66.7 153 100 145.5C133.3 138 166.7 126 200 129.2C233.3 132.3 266.7 150.7 300 152.2C333.3 153.7 366.7 138.3 400 137C433.3 135.7 466.7 148.3 500 155.5C533.3 162.7 566.7 164.3 600 155.2C633.3 146 666.7 126 700 124.8C733.3 123.7 766.7 141.3 800 147.7C833.3 154 866.7 149 883.3 146.5L900 144L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
                    fill="#d3dcff"
                ></path>
                <path
                    d="M0 54L16.7 58.8C33.3 63.7 66.7 73.3 100 81.7C133.3 90 166.7 97 200 92.7C233.3 88.3 266.7 72.7 300 71.8C333.3 71 366.7 85 400 86C433.3 87 466.7 75 500 72.5C533.3 70 566.7 77 600 74.7C633.3 72.3 666.7 60.7 700 57.5C733.3 54.3 766.7 59.7 800 60.8C833.3 62 866.7 59 883.3 57.5L900 56L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
                    fill="#fce2fd"
                ></path>
            </svg>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <LogInToast setShow={setShow} show={show} />
            <NavBar setShow={setShow} />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/menu">
                    <Menu setShowModal={setShowModal} />
                </Route>

                <Route path="/about">
                    <About />
                </Route>

                <Route path="/cart">
                    <Cart />
                </Route>

                <Route path="/checkout">
                    {options.clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <CardSection />
                        </Elements>
                    )}
                </Route>
                <Route path={"/successful_payment"}>
                    {options.clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <SuccessfulPayment />
                        </Elements>
                    )}
                </Route>
                <Route path="/signup">
                    <SignUp setShow={setShow} />
                </Route>
                <Route path="/login">
                    <LogIn setShow={setShow} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
