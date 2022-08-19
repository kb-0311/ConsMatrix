import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin=false, component: Component, ...rest }) => {
  const alert = useAlert();
  const { loading, isAuthenticated, currentUser } = useSelector((state) => state.user);


  const cannotAccessResource = () => {
    alert.error("Must be an Admin to access the Dashboard");
  }

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && currentUser.role !== "admin") {
              cannotAccessResource();
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;