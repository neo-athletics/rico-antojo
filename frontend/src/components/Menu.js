import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectItem } from "../actions/actions";
import axios from "axios";
import SkeletonCard from "./SkeletonCard";
import Wave from "./Wave";
const Menu = ({ categories, setShowModal }) => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(null);
    let env;
    if (process.env.NODE_ENV == "production") {
        env = process.env.REACT_APP_SERVER_END_POINT_PROD;
    } else {
        env = process.env.REACT_APP_SERVER_END_POINT_DEV;
    }
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(`${env}/api/products`);
                setItems(data);
                console.log(data);
            } catch (e) {
                console.log({ ...e });
                setMessage("Unable to retrieve items at this time.");
            }
        };
        fetchItems();
    }, []);

    return (
        <>
            <Container className="menu-container">
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
                                                    <Col
                                                        sm={12}
                                                        md={6}
                                                        lg={3}
                                                        className="mb-4"
                                                    >
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
            <Wave />
        </>
    );
};

const mapStateToProps = (state) => {
    return { categories: state.categories, items: state.items };
};

export default connect(mapStateToProps, { selectItem })(Menu);
