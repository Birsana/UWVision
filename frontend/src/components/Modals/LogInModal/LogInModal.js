import React, { useState } from "react";
import {
  ModalTitle,
  ModalSignUpButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

const LogInModal = ({ changeModalState }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailInputChange = (event) => {
    setEmail(event.target.value);

    // Removes error once user begins typing inside email field
    if (emailError) {
      setEmailError("");
    }
  };

  const passwordInputChange = (event) => {
    setPassword(event.target.value);

    // Removes error once user begins typing inside email field
    if (passwordError) {
      setPasswordError("");
    }
  };

  const basicInputValidation = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Please enter an email.");
      isValid = false;
    } else if (!email.includes("@uwaterloo.ca")) {
      setEmailError("Please enter a \"@uwaterloo.ca\" email.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      console.log([email, password])
    }
  };

  return (
      <>
      <ModalTitle title={"Log In"} />
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={emailInputChange}
          value={email}
        />
        {emailError && (
            <FormErrorMessage>
              <p>{emailError}</p>
            </FormErrorMessage>
        )}
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={passwordInputChange}
          value={password}
        />
        {passwordError && (
            <FormErrorMessage>
              <p>{passwordError}</p>
            </FormErrorMessage>
        )}
        <FormSubmitButton value="Log In" />
      </form>
      <ModalSignUpButton onClick={() => changeModalState("Sign Up")}/>
      </>
  )
};

export default LogInModal;