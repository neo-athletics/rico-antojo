import "./App.css";
import "./scss/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
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
dotenv.config();

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <div className="App">
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <LogInToast setShow={setShow} show={show} />
            <NavBar setShow={setShow} />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                {/* <Route path="/menu">
                    <Menu setShowModal={setShowModal} />
                </Route> */}
                <ProtectedRoute
                    path="/menu"
                    component={Menu}
                    setShowModal={setShowModal}
                />
                <Route path="/about">
                    <About />
                </Route>

                <Route path="/cart">
                    <Cart />
                </Route>

                <Route path="/checkout">
                    <Elements stripe={stripePromise}>
                        <CardSection />
                    </Elements>
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
