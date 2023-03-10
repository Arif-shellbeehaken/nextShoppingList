import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { signIn, signOut, useSession } from "next-auth/react";
export const Logout = () => {
  const { data: session, status } = useSession();
  return (
    <Fragment>
      {session ? (
        <NavLink
          href={`/api/auth/signout`}
          onClick={() => {
            e.preventDefault();
            signOut();
          }}
        >
          Logout
        </NavLink>
      ) : (
        <NavLink
          href="/"
          onClick={() => localStorage.setItem("loginSession", "")}
        >
          Logout
        </NavLink>
      )}
    </Fragment>
  );
};

export default Logout;
