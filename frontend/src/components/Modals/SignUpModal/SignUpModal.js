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
import { Formik, Form, Field } from "formik";
import { signUp, isUserConfirmed } from "backendActions";

const SignUpModal = ({ changeModalState }) => {
  const [username, setUsername] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  const validate = (values) => {
    const { username, email, password, confirmPassword } = values;
    const errors = {};
    if (!username || username.trim().length === 0) {
      errors.username = "Username cannot be blank";
    }
    if (!email.includes("@uwaterloo.ca")) {
      errors.email = "Please enter a @uwaterloo.ca email";
    }
    if (!email || email.trim().length === 0) {
      errors.email = "Email cannot be blank";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!password) {
      errors.password = "Password cannot be blank";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords don't match";
    }
    return errors;
  };

  // Handles switching back the modal to the log-in state once the user has successfully been created
  const signInAfterConfirm = () => {
    isUserConfirmed(username).then((response) => {
      let isConfirmed = response.data.status;
      if (isConfirmed) {
        changeModalState("Log In");
      } else {
        setConfirmationError("Please confirm your email");
      }
    });
  };

  return (
    <>
      <ModalTitle title={"Sign Up"} />
      {!accountCreated ? (
        <>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validate={validate}
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              setUsername(values.username);
              signUp(values.username, values.email, values.password)
                .then((res) => {
                  setAccountCreated(true);
                })
                .catch((error) => {
                  let message = error.response.data.error.message;
                  if (message.includes("username: is already taken.")) {
                    actions.setErrors({
                      username: "Username is already in use",
                    });
                  }
                  if (message.includes("email: is already taken.")) {
                    actions.setErrors({ email: "Email is already in use" });
                  }
                  actions.setSubmitting(false);
                });
            }}
          >
            {(props) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoFocus={true}
                  maxLength={32}
                  as={FormInput}
                />
                {props.errors.username && (
                  <FormErrorMessage>
                    <p>{props.errors.username}</p>
                  </FormErrorMessage>
                )}
                <Field
                  type="email"
                  name="email"
                  maxLength={64}
                  placeholder="Email (@uwaterloo.ca)"
                  as={FormInput}
                />
                {props.errors.email && (
                  <FormErrorMessage>
                    <p>{props.errors.email}</p>
                  </FormErrorMessage>
                )}
                <Field
                  type="password"
                  name="password"
                  maxLength={64}
                  placeholder="Password"
                  as={FormInput}
                />
                {props.errors.password && (
                  <FormErrorMessage>
                    <p>{props.errors.password}</p>
                  </FormErrorMessage>
                )}
                <Field
                  type="password"
                  name="confirmPassword"
                  maxLength={64}
                  placeholder="Confirm password"
                  as={FormInput}
                />
                {props.errors.confirmPassword && (
                  <FormErrorMessage>
                    <p>{props.errors.confirmPassword}</p>
                  </FormErrorMessage>
                )}
                <FormSubmitButton
                  disabled={props.isSubmitting}
                  type="submit"
                  value="Sign Up"
                />
              </Form>
            )}
          </Formik>
          <ModalLogInButton onClick={() => changeModalState("Log In")} />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 16,
          }}
        >
          <ModalText style={{ marginLeft: 0, marginBottom: 0 }}>
            Welcome <b>{username}</b>!
          </ModalText>
          <ModalText style={{ marginLeft: 0 }}>
            You will receive an email to confirm your newly created account
            shortly. Once you have confirmed your account, go ahead and log in!
          </ModalText>
          <ModalButton onClick={signInAfterConfirm}>Log In</ModalButton>
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
