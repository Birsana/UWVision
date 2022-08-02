import React from "react";
import {
  ModalTitle,
  ModalSignUpButton,
  ModalForgotPasswordButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import { Formik, Form, Field } from "formik";
import { logIn } from "backendActions";
import { connect } from "react-redux";

const LogInModal = (props) => {
  const validate = (values) => {
    const { username, password } = values;
    const errors = {};

    if (!username || username.trim().length === 0) {
      errors.username = "Username cannot be blank";
    }
    if (!password) {
      errors.password = "Password cannot be blank";
    }
    return errors;
  };

  return (
    <>
      <ModalTitle title={"Login"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validate={validate}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          logIn(values.username, values.password)
            .then((response) => {
              props.dispatch({ type: "LOGIN", userInfo: response.data });
            })
            .catch((error) => {
              actions.setErrors({ password: "Invalid user credentials" });
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
              type="username"
              name="username"
              maxLength={64}
              placeholder="Username"
              autoFocus={true}
              as={FormInput}
            />
            {props.errors.username && (
              <FormErrorMessage>
                <p>{props.errors.username}</p>
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
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              value="Login"
            />
          </Form>
        )}
      </Formik>
      <ModalForgotPasswordButton
        onClick={() => props.changeModalState("Forgot Password")}
      />
      <ModalSignUpButton onClick={() => props.changeModalState("Sign Up")} />
    </>
  );
};

export default connect()(LogInModal);
