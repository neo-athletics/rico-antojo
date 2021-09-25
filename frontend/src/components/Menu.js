import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectItem } from "../actions/actions";
import axios from "axios";

const Menu = ({ categories, setShowModal }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await axios.get("/api/products");
            setItems(data);
        };
        fetchItems();
    }, []);

    return (
        <>
            <Container>
                {categories.map((category) => {
                    return (
                        <>
                            <h2 className={"mb-3"}>{category}</h2>
                            <Row className={"mb-5"}>
                                {items
                                    .filter(
                                        (item) => item.category === category
                                    )
                                    .map((item) => {
                                        return (
                                            <Col sm={12} md={6} lg={3}>
                                                <Item
                                                    setShowModal={setShowModal}
                                                    item={item}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </>
                    );
                })}
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return { categories: state.categories, items: state.items };
};

export default connect(mapStateToProps, { selectItem })(Menu);
