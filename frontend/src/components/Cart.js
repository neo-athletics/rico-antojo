import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateItemQty, removeItem } from "../actions/actions";
import { Button, Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Cart = () => {
    const { cart, userStatus } = useSelector((state) => state);
    const history = useHistory();

    const { register, handleSubmit, watch } = useForm();

    const quantity = watch("quantity");
    const dispatch = useDispatch();

    const handleChange = (e, item) => {
        console.log(e.target.value);
        dispatch(updateItemQty(item, e.target.value));
    };
    const reducer = (accu, curr) => {
        return accu + curr.price * curr.quantity;
    };
    console.log(cart, quantity);

    const handleClick = () => {
        history.push("/cart");
    };
    const discount = parseFloat(
        cart.reduce(reducer, 0.0) - cart.reduce(reducer, 0.0) * 0.1
    ).toFixed(2);

    return (
        <>
            <Container>
                <Row>
                    <h1>Ready to check out</h1>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: 0 }} lg={9}>
                        {cart.length === 0 && (
                            <p>There are currently no items in your cart</p>
                        )}
                        {cart.map((item) => (
                            <>
                                <div className={"itemLine"}></div>
                                <Row
                                    className={
                                        "itemContainer align-content-center"
                                    }
                                >
                                    <Col lg={6}>
                                        <span>{item.description}</span>
                                    </Col>
                                    <Col>
                                        <span>
                                            $
                                            {parseFloat(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </Col>
                                    <Col>
                                        <select
                                            {...register("quantity")}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleChange(e, item)
                                            }
                                        >
                                            {[...Array(10)].map((opt, i) => (
                                                <option value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className={"removeItem"}
                                            onClick={() =>
                                                dispatch(removeItem(item))
                                            }
                                        ></button>
                                    </Col>
                                </Row>
                            </>
                        ))}
                    </Col>
                    <Col className={"d-flex justify-content-center"}>
                        <Container>
                            {!userStatus.status && (
                                <>
                                    <Row>
                                        <p>Log In and get 10% off!</p>
                                    </Row>
                                    <Row>
                                        <Button variant="outline-primary">
                                            <Nav.Link
                                                as={Link}
                                                onClick={handleClick}
                                                to="/login"
                                                className="check-out-link"
                                            >
                                                Log In
                                            </Nav.Link>
                                        </Button>
                                    </Row>
                                    <Row>
                                        <p>
                                            Don't have an account?, Sign up it's
                                            free!
                                        </p>
                                    </Row>
                                    <Row>
                                        <Button variant="outline-secondary">
                                            <Nav.Link
                                                as={Link}
                                                onClick={handleClick}
                                                to="/signup"
                                                className="check-out-link"
                                            >
                                                Sign Up
                                            </Nav.Link>
                                        </Button>
                                    </Row>
                                </>
                            )}
                            <Row>
                                <span>
                                    Total $
                                    {userStatus.status === "success"
                                        ? discount
                                        : parseFloat(
                                              cart.reduce(reducer, 0.0)
                                          ).toFixed(2)}
                                </span>
                            </Row>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Link to="/checkout">
                        <Button
                            disabled={cart.length > 0 ? false : true}
                            variant="primary"
                            type="submit"
                        >
                            Check Out
                        </Button>
                    </Link>
                </Row>
            </Container>
        </>
    );
};

export default Cart;
