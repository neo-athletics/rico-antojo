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
function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="App">
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <NavBar />
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
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <LogIn />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
