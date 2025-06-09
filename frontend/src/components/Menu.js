import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Container, Row, Col } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { selectItem } from "../actions/actions";
import axios from "axios";
import SkeletonCard from "./SkeletonCard";
import Wave from "./Wave";
const Menu = ({ categories, setShowModal }) => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState(null);
    const env = useSelector((state) => state.environment);

    useEffect(() => {
        if (!items.length) {
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
        }
    }, [items.length]);

    const renderCategoryItems = (category) => {
        const filteredItems = items.filter(
            (item) => item.category === category
        );
        return filteredItems.map((item) => (
            <Col sm={12} md={6} lg={3} className="mb-4" key={item.id}>
                <Item setShowModal={setShowModal} item={item} />
            </Col>
        ));
    };

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
                                        renderCategoryItems(category)
                                    )}
                                    {/* {items.length === 0 ? (
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
                                    )} */}
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
