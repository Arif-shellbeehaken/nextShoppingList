import React, { useState, useCallback, useEffect } from "react";
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

import { useRegisterUserMutation } from "../../redux/slice/userSlice";

import toast, { Toaster } from "react-hot-toast";

const RegisterModal = ({ isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [registerUser, isSuccess, isError, isLoading, error] =
    useRegisterUserMutation();
  const handleToggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Create user object
    const userInfo = {
      name,
      email,
      password,
    };

    try {
      let newUser = await registerUser(userInfo);

      if (newUser.error) {
        toast.error(newUser.error.data.error);
      }

      if (newUser.data) {
        toast.success("User registration successflly done.");
      }
    } catch (err) {
      toast.error(`Failed to save the user data ${err}`);
    }
    // console.log(formData);
    // Close modal
    handleToggle();
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
    <div>
      <NavLink onClick={handleToggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleChangeName}
              />

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
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RegisterModal;
