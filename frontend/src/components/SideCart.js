import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideCart = () => {
    const { cart, userStatus } = useSelector((state) => state);

    const reducer = (accu, curr) => {
        return accu + curr.price * curr.quantity;
    };
    const discount = parseFloat(
        cart.reduce(reducer, 0.0) - cart.reduce(reducer, 0.0) * 0.1
    ).toFixed(2);

    return (
        <div className="dropdown-menu sideCart" style={{ left: "-107px" }}>
            <Container>
                <Col>
                    <Row>
                        <p>
                            Total $
                            {userStatus.status === "success"
                                ? discount
                                : parseFloat(cart.reduce(reducer, 0.0)).toFixed(
                                      2
                                  )}
                        </p>
                    </Row>

                    {cart.map((item) => (
                        <>
                            <Row className="itemSideCart">
                                <Col>
                                    <Row>
                                        <p className="itemTitle">
                                            {item.description}
                                        </p>
                                    </Row>

                                    <Row>
                                        <p className="itemPrice">
                                            ea.$
                                            {parseFloat(item.price).toFixed(2)}
                                        </p>
                                        <p className="itemQty">
                                            qty. {item.quantity}
                                        </p>
                                        <p className="itemTotalPrice">
                                            subtotal $
                                            {parseFloat(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    ))}

                    <Row>
                        <Link to="/checkout">
                            <Button variant="primary" type="submit">
                                Check Out
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Container>
        </div>
    );
};

export default SideCart;
