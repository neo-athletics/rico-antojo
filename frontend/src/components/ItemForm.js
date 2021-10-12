import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { purchaseItem } from "../actions/actions";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Row, Col } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const modalContent = {
    hidden: {
        y: "-100vh",
        opacity: 0,
        transition: { duration: 0.5 },
    },
    visible: {
        y: "200px",
        opacity: 1,
    },
};

const ItemForm = ({
    selectedItem,
    setShowModal,
    purchaseItem,
    cart,
    setShowToast,
}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const numOfScoops = watch("scoops", 0);
    const flavors = watch("iceCreamFlavor", 0);

    const onSubmit = (data) => {
        purchaseItem(selectedItem, { ...data, id: uuidv4() });
        setShowToast(true);
        console.log(cart, numOfScoops, flavors);
    };

    return (
        <motion.div className={"modalContent"} variants={modalContent}>
            <p>{selectedItem.itemName}</p>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SimpleBar style={{ maxHeight: 300 }}>
                        <Col>
                            <Row className="flex-column justify-content-start">
                                {selectedItem.chooseSize ? (
                                    <>
                                        <h6>Choose size</h6>

                                        <ul className={"itemList"}>
                                            {Object.keys(
                                                selectedItem.chooseSize
                                            ).map((key) => {
                                                let cost = parseFloat(
                                                    selectedItem.chooseSize[key]
                                                ).toFixed(2);
                                                if (
                                                    selectedItem.itemName ===
                                                        "Agua Fresca" ||
                                                    selectedItem.itemName ===
                                                        "Mangonada"
                                                ) {
                                                    return (
                                                        <li>
                                                            <label
                                                                htmlFor={key}
                                                            >
                                                                {key} oz: $
                                                                {cost}
                                                                <input
                                                                    id={key}
                                                                    type={
                                                                        "radio"
                                                                    }
                                                                    name={
                                                                        "size"
                                                                    }
                                                                    value={key}
                                                                    {...register(
                                                                        "size",
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </label>
                                                        </li>
                                                    );
                                                } else if (
                                                    selectedItem.itemName ===
                                                    "Ice Cream"
                                                ) {
                                                    return (
                                                        <li>
                                                            <label
                                                                htmlFor={key}
                                                            >
                                                                {key} Scoop: $
                                                                {cost}
                                                                <input
                                                                    id={key}
                                                                    type={
                                                                        "radio"
                                                                    }
                                                                    name={
                                                                        "scoops"
                                                                    }
                                                                    value={key}
                                                                    {...register(
                                                                        "scoops",
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </label>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li>
                                                            <label
                                                                htmlFor={key}
                                                            >
                                                                {key}: ${cost}
                                                                <input
                                                                    id={key}
                                                                    type={
                                                                        "radio"
                                                                    }
                                                                    name={
                                                                        "size"
                                                                    }
                                                                    value={key}
                                                                    {...register(
                                                                        "size",
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </label>
                                                        </li>
                                                    );
                                                }
                                            })}
                                        </ul>
                                    </>
                                ) : (
                                    <div className="itemList">
                                        <div>
                                            <label>
                                                Bag: $
                                                {parseFloat(
                                                    selectedItem.price
                                                ).toFixed(2)}
                                                <input
                                                    type={"radio"}
                                                    name={selectedItem.itemName}
                                                    id={selectedItem.itemName}
                                                    value={"bag"}
                                                    {...register(
                                                        selectedItem.itemName,
                                                        { required: true }
                                                    )}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {errors?.scoops?.type === "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please choose a number of scoops
                                    </p>
                                )}
                                {errors[selectedItem.itemName]?.type ===
                                    "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please select an Item
                                    </p>
                                )}
                                {errors?.size?.type === "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please choose a size
                                    </p>
                                )}
                            </Row>
                            <Row className="flex-column justify-content-start">
                                {selectedItem.typeOfChips && (
                                    <>
                                        <h6>Type Of Chips</h6>

                                        <ul className={"itemList"}>
                                            {selectedItem.typeOfChips.map(
                                                (chips) => (
                                                    <li>
                                                        <label htmlFor={chips}>
                                                            {chips}
                                                            <input
                                                                id={chips}
                                                                type="radio"
                                                                value={chips}
                                                                name={"chips"}
                                                                {...register(
                                                                    "chips",
                                                                    {
                                                                        required: true,
                                                                    }
                                                                )}
                                                            />
                                                        </label>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                )}

                                {errors.chips?.type === "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please choose a type of chips
                                    </p>
                                )}
                            </Row>
                            <Row className="flex-column justify-content-start">
                                {selectedItem.flavor && (
                                    <>
                                        <h6>Flavors</h6>

                                        <ul className={"itemList"}>
                                            {selectedItem.flavor.map(
                                                (flavor, index) => {
                                                    if (
                                                        selectedItem.itemName ===
                                                        "Ice Cream"
                                                    ) {
                                                        return (
                                                            <li>
                                                                <label
                                                                    htmlFor={
                                                                        flavor
                                                                    }
                                                                >
                                                                    {flavor}
                                                                    <input
                                                                        type={
                                                                            "checkbox"
                                                                        }
                                                                        name={
                                                                            "iceCreamFlavor"
                                                                        }
                                                                        value={
                                                                            flavor
                                                                        }
                                                                        id={
                                                                            flavor
                                                                        }
                                                                        {...register(
                                                                            "iceCreamFlavor",
                                                                            {
                                                                                required: true,
                                                                                validate:
                                                                                    () => {
                                                                                        return (
                                                                                            flavors.length <=
                                                                                            parseInt(
                                                                                                numOfScoops
                                                                                            )
                                                                                        );
                                                                                    },
                                                                            }
                                                                        )}
                                                                    />
                                                                </label>
                                                            </li>
                                                        );
                                                    } else {
                                                        return (
                                                            <li>
                                                                <label
                                                                    htmlFor={
                                                                        flavor
                                                                    }
                                                                >
                                                                    {flavor}
                                                                    <input
                                                                        type={
                                                                            "radio"
                                                                        }
                                                                        name={
                                                                            "flavor"
                                                                        }
                                                                        value={
                                                                            flavor
                                                                        }
                                                                        id={
                                                                            flavor
                                                                        }
                                                                        {...register(
                                                                            "flavor",
                                                                            {
                                                                                required: true,
                                                                            }
                                                                        )}
                                                                    />
                                                                </label>
                                                            </li>
                                                        );
                                                    }
                                                }
                                            )}
                                        </ul>
                                    </>
                                )}
                                {errors.flavor?.type === "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please choose a flavor of your liking
                                    </p>
                                )}
                                {errors.iceCreamFlavor?.type === "required" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        Please choose at least one flavor
                                    </p>
                                )}
                                {errors.iceCreamFlavor?.type === "validate" && (
                                    <p
                                        className={
                                            "d-flex justify-content-start"
                                        }
                                    >
                                        limit is {numOfScoops}
                                    </p>
                                )}
                            </Row>
                            <Row className="flex-column justify-content-start">
                                {selectedItem.toppings && (
                                    <>
                                        <h6>Toppings</h6>

                                        <ul className={"itemList"}>
                                            {selectedItem.toppings.map(
                                                (topping) => (
                                                    <li>
                                                        <label
                                                            htmlFor={topping}
                                                        >
                                                            {topping}
                                                            <input
                                                                type={
                                                                    "checkbox"
                                                                }
                                                                name={
                                                                    "iceCreamTopping"
                                                                }
                                                                value={topping}
                                                                id={topping}
                                                                {...register(
                                                                    "iceCreamTopping"
                                                                )}
                                                            />
                                                        </label>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                )}
                            </Row>
                            <Row className={"justify-content-end"}>
                                <select
                                    name={"quantity"}
                                    {...register("quantity")}
                                    className={"select-item-form"}
                                >
                                    {[...Array(10)].map((opt, i) => (
                                        <option value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <Button
                                    as="input"
                                    type="submit"
                                    value={"add to cart"}
                                    className={"submit-item-form"}
                                />
                                {/* <input type={"submit"} value={"add to cart"} /> */}
                            </Row>
                        </Col>
                    </SimpleBar>
                </form>
            </Container>
            <button
                className={"modalButton"}
                onClick={() => setShowModal(false)}
            >
                <FontAwesomeIcon icon={faTimesCircle} color={"black"} />
            </button>
        </motion.div>
    );
};

const mapStateToProps = (state, ownProps) => {
    console.log(state.cart, ownProps);
    return {
        selectedItem: state.selectedItem,
        cart: state.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseItem: (item, data) => dispatch(purchaseItem(item, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
