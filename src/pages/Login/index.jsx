import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import SignInImage from "../../assets/images/sign_in.png";
import { loginController } from "../../controllers/login.controller";

const Login = () => {
  const [signInDetails, setSignInDetails] = useState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const { openLoader, handleSubmit, handleInputChange } = loginController(
    signInDetails,
    setSignInDetails,
    true
  );

  return (
    <>
      <Loader open={openLoader} />

      <FormContainer backgroundImage={SignInImage} formText="Sign In">
        <FormInput
          label="Email"
          error={signInDetails.email.error}
          value={signInDetails.email.value}
          inputId="email"
          handleInputChange={handleInputChange}
        />
        <FormInput
          label="Password"
          error={signInDetails.password.error}
          value={signInDetails.password.value}
          inputId="password"
          password
          handleInputChange={handleInputChange}
        />

        <FormButton
          value="Sign In"
          handleClick={() =>
            handleSubmit({
              email: signInDetails.email.value,
              password: signInDetails.password.value,
            })
          }
        />

        <h6 className="text-center text-base font-Museo text-customBlack-200">
          <Link to={"/admin/forgotPassword"} className="text-customGreen-100">
            Forgot Password?
          </Link>
        </h6>
      </FormContainer>
    </>
  );
};

export default Login;
