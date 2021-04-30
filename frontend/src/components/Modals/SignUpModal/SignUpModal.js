import React, { useState } from "react";
import {
  ModalTitle,
  ModalLogInButton,
  ModalButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
  ModalText,
} from "../styles";
import {signUp, isUserConfirmed} from './SignUpModal.helpers'

const SignUpModal = ({ changeModalState }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [accountCreated, setAccountCreated] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

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
      setEmailError('Please enter a "@uwaterloo.ca" email.');
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      signUp(username, email, password)
        .then((response) => {
          setAccountCreated(true);
        })
        .catch((error) => {
          let message = error.response.data.error.message;

          if (message.includes("username: is already taken.")) {
            setUsernameError("This username is already taken.");
          }

          if (message.includes("email: is already taken.")) {
            setEmailError("This email is already in use.");
          }
        });
    }
  };

  const signInAfterConfirm = () => {
    isUserConfirmed(username).then(response => {
      let isConfirmed = response.data.status

      if (isConfirmed) {
        changeModalState("Log In");
      } else {
        setConfirmationError("Please confirm your email first.");
      }
    });
  };

  return (
    <>
      <ModalTitle title={"Sign Up"} />
      {!accountCreated ? (
        <>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              onChange={usernameInputChange}
              value={username}
            />
            {usernameError && (
              <FormErrorMessage>
                <p>{usernameError}</p>
              </FormErrorMessage>
            )}
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
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={confirmPasswordInputChange}
              value={confirmPassword}
            />
            {confirmPasswordError && (
              <FormErrorMessage>
                <p>{confirmPasswordError}</p>
              </FormErrorMessage>
            )}
            <FormSubmitButton value="Sign Up" />
          </form>
          <ModalLogInButton onClick={() => changeModalState("Log In")} />{" "}
        </>
      ) : (
        <>
        <ModalText>Welcome <b>{username}</b>!</ModalText>
        <ModalText>You will receive an email to confirm your newly created account shortly.</ModalText>
        <ModalText>Once you have confirmed your account, go ahead and log in!</ModalText>
        <ModalButton onClick={signInAfterConfirm}>Log In!</ModalButton>
        {confirmationError && <FormErrorMessage><p>{confirmationError}</p></FormErrorMessage>}
        </>
      )}
    </>
  );
};

export default SignUpModal;