import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateItemQty, removeItem } from "../actions/actions";
import { Button, Container, Row, Col } from "react-bootstrap";
// import SideCart from "./SideCart";

const Cart = () => {
    const cart = useSelector((state) => state.cart);

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
    return (
        <>
            <Container>
                {/* <SideCart /> */}
                <Row>
                    <h1>Ready to check out</h1>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: 0 }} lg={9}>
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
                                            // name={"quantity"}
                                            // ref={register}
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
                        <span>
                            Total $
                            {parseFloat(cart.reduce(reducer, 0.0)).toFixed(2)}
                        </span>
                    </Col>
                </Row>
                <Row>
                    <form action="" method="">
                        <Button variant="primary" type="submit">
                            Check Out
                        </Button>
                    </form>
                </Row>
            </Container>
        </>
    );
};

export default Cart;
