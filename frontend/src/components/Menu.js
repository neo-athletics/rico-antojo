import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectItem } from "../actions/actions";
import axios from "axios";
import SkeletonCard from "./SkeletonCard";
const Menu = ({ categories, setShowModal }) => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get("/api/products");
                setItems(data);
            } catch (e) {
                setMessage("Unable to retrieve items at this time.");
            }
        };
        fetchItems();
    }, []);

    return (
        <>
            <Container>
                {message ? (
                    <p>{message}</p>
                ) : (
                    categories.map((category) => {
                        return (
                            <>
                                <h2 className={"mb-3"}>{category}</h2>
                                <Row className={"mb-5"}>
                                    {items.length === 0 ? (
                                        <SkeletonCard />
                                    ) : (
                                        items
                                            .filter(
                                                (item) =>
                                                    item.category === category
                                            )
                                            .map((item) => {
                                                return (
                                                    <Col sm={12} md={6} lg={3}>
                                                        <Item
                                                            setShowModal={
                                                                setShowModal
                                                            }
                                                            item={item}
                                                        />
                                                    </Col>
                                                );
                                            })
                                    )}
                                </Row>
                            </>
                        );
                    })
                )}
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return { categories: state.categories, items: state.items };
};

export default connect(mapStateToProps, { selectItem })(Menu);
