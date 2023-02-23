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
  Alert,
} from "reactstrap";

import { useUserLoginMutation } from "../../redux/slice/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginModal = ({ isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [userLogin, isSuccess, isError, error, isLoading] =
    useUserLoginMutation();

  const handleToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const userInfo = { email: email, password: password };
    console.log(userInfo);
    try {
      let newUser = await userLogin(userInfo);
      console.log({ newUser });
      if (newUser.data?.status !== "success" && newUser.error.data.error) {
        toast.error(newUser.error.data.error.msg);
      }

      if (newUser.data?.status === "success") {
        toast.success("User Login successflly!.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }

    // Close modal
    handleToggle();
    // Attempt to login
  };

  useEffect(() => {
    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [handleToggle, isAuthenticated, modal]);

  return (
    <>
      <div>
        <NavLink onClick={handleToggle} href="#">
          Login
        </NavLink>

        <Modal isOpen={modal} toggle={handleToggle}>
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
                  {isLoading ? "Login process continue..." : "Login"}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
          <div>
            <hr />
            <h2 className="text-center">OR</h2>
            <div className="text-center align-center justify-center m-5">
              <Fragment>
                <NavLink
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Login By Google Account
                </NavLink>
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
