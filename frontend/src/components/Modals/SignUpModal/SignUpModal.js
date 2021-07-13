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
    // User cannot submit an empty username
    if (!username) {
      setUsernameError("Please enter a username.");
      return false;
    }

    // User cannot submit an empty email
    if (!email) {
      setEmailError("Please enter an email.");
      return false;
    }
    // User cannot use a non-uwaterloo email
    else if (!email.includes("@uwaterloo.ca")) {
      setEmailError('Please enter a @uwaterloo.ca email.');
      return false;
    }

    // User cannot submit an empty password
    if (!password) {
      setPasswordError("Please enter a password.");
      return false;
    }

    //! Password strength checks
    // Must AT LEAST be 8 characters long
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    // Must AT LEAST contain 1 special character
    // eslint-disable-next-line no-useless-escape
    let specialCharRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if (!password.match(specialCharRegex)) {
      setPasswordError("Password must contain at least 1 special character.");
      return false;
    }

    // User cannot submit an empty confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm the password.");
      return false;
    }
    // User cannot submit a confirm password that doesn't match the previous password
    else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }

    return true;
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
          <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              onChange={usernameInputChange}
              value={username}
              autoFocus={true}
              maxLength={32}
            />
            {usernameError && (
              <FormErrorMessage>
                <p>{usernameError}</p>
              </FormErrorMessage>
            )}
            <FormInput
              type="text"
              name="email"
              placeholder="Email (@uwaterloo.ca)"
              onChange={emailInputChange}
              value={email}
              maxLength={64}
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
              maxLength={64}
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
              maxLength={64}
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          <ModalText style={{ marginLeft: 0 }}>
            Welcome <b>{username}</b>!
          </ModalText>
          <ModalText style={{ marginLeft: 0 }}>
            You will receive an email to confirm your newly created account
            shortly.
          </ModalText>
          <ModalText style={{ marginLeft: 0 }}>
            Once you have confirmed your account, go ahead and log in!
          </ModalText>
          <ModalButton onClick={signInAfterConfirm}>Log In!</ModalButton>
          {confirmationError && (
            <FormErrorMessage>
              <p>{confirmationError}</p>
            </FormErrorMessage>
          )}
        </div>
      )}
    </>
  );
};

export default SignUpModal;
