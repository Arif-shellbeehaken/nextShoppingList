import React, { Fragment, useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { useSession } from "next-auth/react";

const NavbarSection = ({ manualLogged }) => {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem className="mt-2">
        <span className="navbar-text">
          Welcome{" "}
          <strong className="text-white">
            {/* {auth && auth.user ? `Welcome ${auth.user.name}` : ''} */}
            {manualLogged.token
              ? manualLogged.user.name
              : session?.user && session.user.name}
          </strong>
        </span>
      </NavItem>
      <NavItem className="mr-2">
        {" "}
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        {" "}
        <RegisterModal />{" "}
      </NavItem>
      <NavItem>
        {" "}
        <LoginModal />{" "}
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Container>
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <Nav className="ml-auto" navbar>
              {/* {guestLinks} */}
              {/* {auth && auth.isAuthenticated ? authLinks : guestLinks} */}
              {manualLogged.token
                ? authLinks
                : session
                ? authLinks
                : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarSection;
