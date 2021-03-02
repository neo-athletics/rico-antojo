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
        <Route path="/menu">
          <Menu setShowModal={setShowModal} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
