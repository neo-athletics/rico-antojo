import React from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";

const LogInToast = ({ setShow, show }) => {
    const { userStatus } = useSelector((state) => state);
    console.log(userStatus, "toast");

    return (
        <Toast
            className={
                userStatus.message?.loggedIn ? "bg-success" : "bg-danger"
            }
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "1",
            }}
            onClose={() => setShow(false)}
            delay={2000}
            show={show}
            autohide
        >
            <Toast.Header>{userStatus.message?.header}</Toast.Header>
            <Toast.Body>
                {userStatus.message?.body}
                {userStatus.message?.loggedIn &&
                    `, ${userStatus.user?.username}`}
            </Toast.Body>
        </Toast>
    );
};

export default LogInToast;
