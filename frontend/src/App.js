import "./App.css";
import "./scss/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "skeleton-elements/css/skeleton-elements.css";
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
import ProtectedRoute from "./components/ProtectedRoute";
import LogInToast from "./components/LogInToast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import dotenv from "dotenv";
import CardSection from "./components/CardSection";
import axios from "axios";
import { useSelector } from "react-redux";
import SuccessfulPayment from "./components/SuccessfulPayment";

dotenv.config();

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const cart = useSelector((state) => state.cart);
    const [options, setOptions] = useState({ clientSecret: "" });

    const fetchData = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/create-payment-intent",
                { items: [...cart] },
                { withCredentials: true }
            );
            const { data } = await res;
            console.log(data);
            const { clientSecret } = await data;
            setOptions({ clientSecret: clientSecret });
        } catch (e) {
            console.log(e);
        }
    };

    // const getCookieSession = (cookieName) => {
    //     console.log(document.cookie);
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
    //     console.log(data);
    // };

    // let isUserActive = async () => {
    //     try {
    //         const res = await axios.get("user");
    //         const { data } = res;
    //         console.log(data, res, "getting user details");
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

    return (
        <div className="App">
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
                {/* <ProtectedRoute
                    path="/menu"
                    component={Menu}
                    setShowModal={setShowModal}
                /> */}
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
