import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signIn, signOut, useSession } from "next-auth/react";
export const Logout = () => {
  const { data: session, status } = useSession();
  return (
    <Fragment>
      <NavLink href="/" onClick={() => signOut()}>
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
