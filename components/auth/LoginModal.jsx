import React, { useState, useEffect, useCallback, Fragment } from "react";
import styles from "../../styles/Home.module.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";

import toast, { Toaster } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "http://localhost:3000",
    });

    // Close modal
    handleToggle();
    // Attempt to login
  };

  return (
    <>
      <div>
        <NavLink onClick={handleToggle} href="#">
          Login
        </NavLink>

        <Modal
          isOpen={modal}
          toggle={handleToggle}
          animation="false"
          fade={false}
        >
          <ModalHeader toggle={handleToggle}>Login</ModalHeader>
          <ModalBody>
            {/* {msg ? <Alert color="danger">{msg}</Alert> : null} */}
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={handleChangeEmail}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={handleChangePassword}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={handleOnSubmit}
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <div>
            <hr />
            <h2 className="text-center">OR</h2>
            <div className="text-center align-center justify-center m-5">
              <Fragment>
                <div className="border rounded p-2 mb-3">
                  <NavLink
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("google", {
                        callbackUrl: "http://localhost:3000",
                      });
                    }}
                  >
                    <Image
                      src={"/google.svg"}
                      width={25}
                      height={25}
                      alt="github"
                    />{" "}
                    Login with Google
                  </NavLink>
                </div>
                <div className="border rounded p-2 mb-3">
                  <NavLink
                    href={`/api/auth/signin`}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("github", {
                        callbackUrl: "http://localhost:3000",
                      });
                    }}
                  >
                    <Image
                      src={"/github.svg"}
                      width={25}
                      height={25}
                      alt="github"
                    />{" "}
                    Login with Github
                  </NavLink>
                </div>
              </Fragment>
            </div>
          </div>
        </Modal>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default LoginModal;
