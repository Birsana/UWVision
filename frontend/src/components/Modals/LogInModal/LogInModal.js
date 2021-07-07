import React, { useState } from "react";
import {
  ModalTitle,
  ModalSignUpButton,
  ModalForgotPasswordButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

// Backend + Redux Imports:
import { logIn } from "backendActions";
import { connect } from "react-redux";

// ==============================================================================================================

// Log In Modal:
const LogInModal = (props) => {
  // Modal States:
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Deals with the email field's inputs
  const emailInputChange = (event) => {
    setEmail(event.target.value);

    // Removes error once user begins typing inside email field
    if (emailError) {
      setEmailError("");
    }
  };

  // Deals with the password field's inputs
  const passwordInputChange = (event) => {
    setPassword(event.target.value);

    // Removes error once user begins typing inside email field
    if (passwordError) {
      setPasswordError("");
    }
  };

  // Basic Form Input Validation
  const basicInputValidation = () => {
    let isValid = true;

    // User cannot submit an empty email
    if (!email) {
      setEmailError("Please enter an email.");
      isValid = false;
    }

    // User cannot sign in with a non-uwaterloo email
    else if (!email.includes("@uwaterloo.ca")) {
      setEmailError('Please enter an @uwaterloo.ca email.');
      isValid = false;
    }

    // User cannot submit an empty password
    if (!password) {
      setPasswordError("Please enter a password.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      logIn(email, password)
        .then((response) => {
          // Calls redux to handle login actions + state management
          props.dispatch({ type: "LOGIN", userInfo: response.data.user });
        })
        .catch((error) => {
          let errorMessage = error.response.data.errors;

          // Error Interpretation based on backend's response
          if ("email" in errorMessage) {
            let message = errorMessage.email;

            if (message.includes("invalid email")) {
              setEmailError("You have entered an invalid email.");
            } else {
              setEmailError("Please confirm your email first.");
            }
          } else if ("password" in errorMessage) {
            setPasswordError("You have entered an invalid password.");
          }
        });
    }
  };

  return (
    <>
      <ModalTitle title={"Login"} />
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
        <FormSubmitButton value="Login" />
      </form>
      <ModalForgotPasswordButton onClick={() => props.changeModalState("Forgot Password")} />
      <ModalSignUpButton onClick={() => props.changeModalState("Sign Up")} />
    </>
  );
};

export default connect()(LogInModal);
