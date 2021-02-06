import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const NavBar = () => {
  const { getCurrentUser, logout, isParent } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutAndReturn = () => {
    return logout().then(() => {
      toast.dark("You are now logged out");
      history.push("/login");
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          <img
            id="header-logo"
            src="/babylogo.png"
            width="30"
            height="30"
            className="mr-1"
            alt="Baby"
          />
          Nashville Babysitter
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user ? (
              <>
                {isParent() && (
                  <NavItem>
                    <NavLink to="/parent/:parentId" tag={Link}>
                      Parent
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink onClick={logoutAndReturn}>Logout</NavLink>
                </NavItem>
              </>
            ) : (
              <></>
            )}
          </Nav>
          {user ? (
            <NavbarText className="d-sm-none d-md-block">
              Welcome {user.displayName}
            </NavbarText>
          ) : null}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
