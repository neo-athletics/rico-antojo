import React from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const logIn = useSelector((state) => state.userStatus);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (logIn.status === "success") {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
