import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SkeletonBlock, SkeletonText } from "skeleton-elements/react";

const SkeletonCard = () => {
    return (
        <>
            <Col sm={12} md={6} lg={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <SkeletonText effect="wave" tag="h5">
                                Lorem ipsum
                            </SkeletonText>
                        </Card.Title>
                        <Card.Text>
                            <SkeletonText effect="wave" tag="p">
                                0.00
                            </SkeletonText>
                            <SkeletonBlock
                                effect="wave"
                                width="55px"
                                height="38px"
                                borderRadius="2px"
                            />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default SkeletonCard;
