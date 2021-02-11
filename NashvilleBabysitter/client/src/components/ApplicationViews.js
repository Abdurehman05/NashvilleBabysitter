import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "./Home";
import ParentDetails from "./ParentDetails";
import ChildForm from "../pages/ChildForm";
import BabysitForm from "../pages/BabysitForm";
import BabysitterDetails from "./BabysitterDetails";
import ConfirmForm from "../pages/ConfirmForm";
import CompleteForm from "../pages/CompleteForm";
import DenyForm from "../pages/DenyForm";

const ApplicationViews = () => {
  const { isLoggedIn, isParent, isBabysitter } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/parent/details">
        {isLoggedIn ? (
          isParent() ? (
            <ParentDetails />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/babysitter/details">
        {isLoggedIn ? (
          isBabysitter() ? (
            <BabysitterDetails />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/child/create">
        {isLoggedIn ? <ChildForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/babysit/create">
        {isLoggedIn ? <BabysitForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/babysit/confirm">
        {isLoggedIn ? <ConfirmForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/babysit/deny">
        {isLoggedIn ? <DenyForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/babysit/complete">
        {isLoggedIn ? <CompleteForm /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
