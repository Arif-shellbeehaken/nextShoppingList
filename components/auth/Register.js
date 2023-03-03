import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import useAuthHook from "../../BusinessLogic/useAuthHook";

const Register = () => {
  const {handleRegisterOnSubmit: handleOnSubmit,handleChangeName,handleChangeEmail,handleChangePassword } = useAuthHook();
  return (
    <div className="offset-col-3 col-6 ">
      <div className="mt-5 mb-5 items-center">
        <h2 className="">Registation</h2>
      </div>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                required
                onChange={handleChangeName}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                required
                onChange={handleChangeEmail}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                required
                onChange={handleChangePassword}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
    </div>
  );
};

export default Register;
