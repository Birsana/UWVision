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

// Backend Imports:
import { signUp, isUserConfirmed } from "backendActions";

// ==============================================================================================================

// Sign Up Modal:
const SignUpModal = ({ changeModalState }) => {
  // Sign-up Form States:
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Post-creation of user states:
  const [accountCreated, setAccountCreated] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  // Deals with the username field's inputs
  const usernameInputChange = (event) => {
    setUsername(event.target.value);

    // Removes error once user begins typing inside username field
    if (usernameError) {
      setUsernameError("");
    }
  };

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

    // Removes error once user begins typing inside password field
    if (passwordError) {
      setPasswordError("");
    }
  };

  // Deals with the confirm password field's inputs
  const confirmPasswordInputChange = (event) => {
    setConfirmPassword(event.target.value);

    // Removes error once user begins typing inside confirm password field
    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
  };

  // Basic Form Input Validation
  const basicInputValidation = () => {
    let isValid = true;

    // User cannot submit an empty username
    if (!username) {
      setUsernameError("Please enter a username.");
      isValid = false;
    }

    // User cannot submit an empty email
    if (!email) {
      setEmailError("Please enter an email.");
      isValid = false;
    }
    // User cannot use a non-uwaterloo email
    else if (!email.includes("@uwaterloo.ca")) {
      setEmailError('Please enter a "@uwaterloo.ca" email.');
      isValid = false;
    }

    // User cannot submit an empty password
    if (!password) {
      setPasswordError("Please enter a password.");
      isValid = false;
    }

    // User cannot submit an empty confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm the password.");
      isValid = false;
    }
    // User cannot submit a confirm password that doesn't match the previous password
    else if (confirmPassword !== password) {
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

          // Error Interpretation based on backend's response
          if (message.includes("username: is already taken.")) {
            setUsernameError("This username is already taken.");
          }

          if (message.includes("email: is already taken.")) {
            setEmailError("This email is already in use.");
          }
        });
    }
  };

  // Handles switching back the modal to the log-in state once the user has successfully been created
  const signInAfterConfirm = () => {
    isUserConfirmed(username).then((response) => {
      let isConfirmed = response.data.status;

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
          <ModalText>
            Welcome <b>{username}</b>!
          </ModalText>
          <ModalText>
            You will receive an email to confirm your newly created account
            shortly.
          </ModalText>
          <ModalText>
            Once you have confirmed your account, go ahead and log in!
          </ModalText>
          <ModalButton onClick={signInAfterConfirm}>Log In!</ModalButton>
          {confirmationError && (
            <FormErrorMessage>
              <p>{confirmationError}</p>
            </FormErrorMessage>
          )}
        </>
      )}
    </>
  );
};

export default SignUpModal;
