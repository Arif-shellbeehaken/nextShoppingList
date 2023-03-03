import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signOut, useSession } from "next-auth/react";
export const Logout = () => {
  const { data: session } = useSession();
  return (
    <Fragment>
      <NavLink href="/" onClick={() => signOut()}>
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
