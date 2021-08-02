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
    const { email, password } = values;
    const errors = {};
    if (!email.includes("@uwaterloo.ca")) {
      errors.email = "Please enter a @uwaterloo.ca email";
    }
    if (!email || email.trim().length === 0) {
      errors.email = "Email cannot be blank";
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
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          logIn(values.email, values.password)
            .then((response) => {
              props.dispatch({ type: "LOGIN", userInfo: response.data.user });
            })
            .catch((error) => {
              let errorMessage = error.response.data.errors;
              if ("email" in errorMessage) {
                let message = errorMessage.email;
                if (message.includes("invalid email")) {
                  actions.setErrors({ email: "Invalid email" });
                } else {
                  actions.setErrors({ email: "Please confirm your email" });
                }
              } else if ("password" in errorMessage) {
                actions.setErrors({ password: "Invalid password" });
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
              type="email"
              name="email"
              maxLength={64}
              placeholder="Email (@uwaterloo.ca)"
              autoFocus={true}
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
