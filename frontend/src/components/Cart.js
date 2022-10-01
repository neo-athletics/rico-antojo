import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateItemQty, removeItem } from "../actions/actions";
import { Button, Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import WaveLayout from "./WaveLayout";

const Cart = () => {
    const { cart, userStatus } = useSelector((state) => state);
    const history = useHistory();

    const { register, handleSubmit, watch } = useForm();

    const quantity = watch("quantity");
    const dispatch = useDispatch();

    const handleChange = (e, item) => {
        dispatch(updateItemQty(item, e.target.value));
    };
    const reducer = (accu, curr) => {
        return accu + curr.price * curr.quantity;
    };

    const handleClick = () => {
        history.push("/cart");
    };
    const discount = parseFloat(
        cart.reduce(reducer, 0.0) - cart.reduce(reducer, 0.0) * 0.1
    ).toFixed(2);

    return (
        <>
            <Container className="checkout-container">
                <Row>
                    <h1>Ready to check out</h1>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: 0 }} md={12} lg={12} xl={12}>
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
                                    <Col sm={3}>
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
                </Row>
                {!userStatus.status && (
                    <Row className="promo-div">
                        <p>
                            <Link to={"/login"}>Log In</Link> and get 10% off!
                            or
                            <Link to={"/signup"}> Sign Up</Link> it's free!
                        </p>
                    </Row>
                )}
                <Row md={2}>
                    <Col style={{ paddingLeft: "0" }}>
                        <Link to="/checkout">
                            <Button
                                disabled={cart.length > 0 ? false : true}
                                variant="primary"
                                type="submit"
                            >
                                Check Out
                            </Button>
                        </Link>
                    </Col>

                    <Col
                        style={{
                            justifyContent: "end",
                            display: "grid",
                            paddingLeft: "0",
                        }}
                    >
                        <span>
                            Total $
                            {userStatus.status === "success" ? (
                                <>
                                    {discount}{" "}
                                    <span className="price-cut">
                                        {parseFloat(
                                            cart.reduce(reducer, 0.0)
                                        ).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                parseFloat(cart.reduce(reducer, 0.0)).toFixed(2)
                            )}
                        </span>
                    </Col>
                </Row>
            </Container>
            <WaveLayout />
        </>
    );
};

export default Cart;
