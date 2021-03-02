import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideCart = () => {
  const cart = useSelector((state) => state.cart);

  const reducer = (accu, curr) => {
    return accu + curr.price * curr.quantity;
  };

  return (
    <div className="dropdown-menu sideCart">
      <Container>
        <Col>
          <Row>
            <p>Total ${parseFloat(cart.reduce(reducer, 0.0)).toFixed(2)}</p>
          </Row>

          {cart.map((item) => (
            <>
              <Row className="itemSideCart">
                <Col>
                  <Row>
                    <p className="itemTitle">{item.description}</p>
                  </Row>

                  <Row>
                    <p className="itemPrice">
                      ea.${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="itemQty">qty. {item.quantity}</p>
                    <p className="itemTotalPrice">
                      subtotal $
                      {parseFloat(item.price * item.quantity).toFixed(2)}
                    </p>
                  </Row>
                </Col>
              </Row>
            </>
          ))}

          <Row>
            <Button variant="primary">Check Out</Button>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default SideCart;
