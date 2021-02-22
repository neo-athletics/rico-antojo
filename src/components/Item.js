import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { selectItem } from "../actions/actions";
const Item = ({ selectItem, item, setShowModal }) => {
  const itemDetails = () => {
    setShowModal(true);
    selectItem();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.itemName}</Card.Title>
        <Card.Text>${parseFloat(item.price).toFixed(2)}</Card.Text>
        <Button onClick={() => itemDetails()} variant="primary">
          Add
        </Button>
      </Card.Body>
    </Card>
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectItem: () => dispatch(selectItem(ownProps.item)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
