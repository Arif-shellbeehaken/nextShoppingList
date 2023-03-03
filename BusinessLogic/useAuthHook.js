import  { useState } from "react";
import { useRegisterUserMutation } from "../redux/slice/userSlice";
import Msg from "../constaint/text.json";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const useAuthHook = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerUser] =
      useRegisterUserMutation();
  
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
  
    const handleRegisterOnSubmit = async (e) => {
      e.preventDefault();
    
    

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
          toast.success(Msg.register.success);
          router.push("/");
        }
      } catch (err) {
        toast.error(Msg.register.error, err);
      }
    };

    const handleLoginOnSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "/",
        });
      };

    return {
      handleRegisterOnSubmit,
      handleChangeName,
      handleChangeEmail,
      handleChangePassword,
      handleLoginOnSubmit,
    };
  };

export default useAuthHook;