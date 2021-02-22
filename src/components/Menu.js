import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectItem } from "../actions/actions";

const Menu = ({ categories, items, setShowModal }) => {
  return (
    <Container>
      {categories.map((category) => {
        return (
          <>
            <h2 className={"mb-3"}>{category}</h2>
            <Row className={"mb-5"}>
              {items
                .filter((item) => item.category === category)
                .map((item) => {
                  return (
                    <Col sm={12} md={6} lg={3}>
                      <Item setShowModal={setShowModal} item={item} />
                    </Col>
                  );
                })}
            </Row>
          </>
        );
      })}
    </Container>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { categories: state.categories, items: state.items };
};

export default connect(mapStateToProps, { selectItem })(Menu);
