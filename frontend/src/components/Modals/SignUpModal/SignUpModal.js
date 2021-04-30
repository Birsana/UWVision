import React, { useState } from "react";
import {
  ModalTitle,
  ModalLogInButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import {signUp} from './SignUpModal.helpers'

const SignUpModal = ({ changeModalState }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const usernameInputChange = (event) => {
    setUsername(event.target.value);

    // Removes error once user begins typing inside username field
    if (usernameError) {
      setUsernameError("");
    }
  };

  const emailInputChange = (event) => {
    setEmail(event.target.value);

    // Removes error once user begins typing inside email field
    if (emailError) {
      setEmailError("");
    }
  };

  const passwordInputChange = (event) => {
    setPassword(event.target.value);

    // Removes error once user begins typing inside password field
    if (passwordError) {
      setPasswordError("");
    }
  };

  const confirmPasswordInputChange = (event) => {
    setConfirmPassword(event.target.value);

    // Removes error once user begins typing inside confirm password field
    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
  };

  const basicInputValidation = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Please enter a username.");
      isValid = false;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm the password.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      signUp(username, email, password).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error.response.data);
      })
      //console.log([username, email, password, confirmPassword]);
    }
  };

  return (
      <>
      <ModalTitle title={"Sign Up"} />
      <form onSubmit={handleSubmit}> 
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          onChange={usernameInputChange}
          value={username}
        />
        {usernameError && <FormErrorMessage><p>{usernameError}</p></FormErrorMessage>}
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={emailInputChange}
          value={email}
        /> 
        {emailError && <FormErrorMessage><p>{emailError}</p></FormErrorMessage>}
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={passwordInputChange}
          value={password}
        />
        {passwordError && <FormErrorMessage><p>{passwordError}</p></FormErrorMessage>}
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={confirmPasswordInputChange}
          value={confirmPassword}
        />
        {confirmPasswordError && <FormErrorMessage><p>{confirmPasswordError}</p></FormErrorMessage>}
        <FormSubmitButton value="Sign Up" />
      </form>
      <ModalLogInButton onClick={() => changeModalState("Log In")} />
      </>
  )
};

export default SignUpModal;