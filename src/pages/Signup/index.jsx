import { useState } from "react";

import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import SignUpImage from "../../assets/images/sign_up.png";
import { loginController } from "../../controllers/login.controller";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    name: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const {
    handleSubmit,
    openLoader: isValidating,
    handleInputChange,
  } = loginController(signUpDetails, setSignUpDetails);

  return (
    <>
      <Loader open={isValidating} />

      <FormContainer backgroundImage={SignUpImage} formText="Sign Up">
        <FormInput
          label="Name"
          error={signUpDetails.name.error}
          value={signUpDetails.name.value}
          inputId="name"
          handleInputChange={handleInputChange}
        />
        <FormInput
          label="Email"
          error={signUpDetails.email.error}
          value={signUpDetails.email.value}
          inputId="email"
          handleInputChange={handleInputChange}
        />
        <FormInput
          label="Password"
          error={signUpDetails.password.error}
          value={signUpDetails.password.value}
          inputId="password"
          password
          handleInputChange={handleInputChange}
        />

        <FormButton
          value="Sign Up"
          handleClick={() =>
            handleSubmit({
              name: signUpDetails.name.value,
              email: signUpDetails.email.value,
              password: signUpDetails.password.value,
            })
          }
        />
      </FormContainer>
    </>
  );
};

export default SignUp;
