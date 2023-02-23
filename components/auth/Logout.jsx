import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signIn, signOut, useSession } from "next-auth/react";
export const Logout = () => {
  return (
    <Fragment>
      <NavLink
        href={`/api/auth/signout`}
        onClick={() => {
          e.preventDefault();
          signOut();
        }}
      >
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
