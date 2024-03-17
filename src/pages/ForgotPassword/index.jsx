import React, { useState } from "react";
import FormButton from "../../components/FormButton";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import ForgotPasswordImage from "../../assets/images/forgot_password.png";
import Loader from "../../components/Loader";
import { forgotPasswordController } from "../../controllers/forgotPassword.controller";

const ForgotPassword = () => {
  const {
    forgotPasswordDetails,
    openLoader,
    handleInputChange,
    handleSetPasswordResetEmail,
  } = forgotPasswordController();

  return (
    <>
      <Loader open={openLoader} />
      <FormContainer
        backgroundImage={ForgotPasswordImage}
        formText="Forgot Password?"
      >
        <FormInput
          label="Email"
          error={forgotPasswordDetails.email.error}
          value={forgotPasswordDetails.email.value}
          inputId="email"
          handleInputChange={handleInputChange}
        />

        <FormButton
          value="Send Password Reset Email"
          handleClick={handleSetPasswordResetEmail}
        />
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
