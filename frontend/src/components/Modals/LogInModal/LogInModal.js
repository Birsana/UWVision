import React, { useState } from "react";
import {
  ModalTitle,
  ModalSignUpButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import {signIn} from './LogInModal.helpers';
import {connect} from 'react-redux';


const LogInModal = (props) => {
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
      signIn(email, password).then(response => {
          props.dispatch({type: "LOGIN", userInfo: response.data.user})
      }).catch((error) => {
          let errorMessage = error.response.data.errors

          if ('email' in errorMessage) {
            let message = errorMessage.email;

            if (message.includes("invalid email")) {
              setEmailError("You have entered an invalid email.")
            } else {
              setEmailError("Please confirm your email first.")
            }
          } else if ('password' in errorMessage) {
            setPasswordError("You have entered an invalid password.")
          }
      })      
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
      <ModalSignUpButton onClick={() => props.changeModalState("Sign Up")}/>
      </>
  )
};

export default connect()(LogInModal);