import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signIn, signOut, useSession } from "next-auth/react";
const LoginAuthModal = () => {
  return (
    <Fragment>
      <NavLink
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Login
      </NavLink>
    </Fragment>
  );
};

export default LoginAuthModal;
