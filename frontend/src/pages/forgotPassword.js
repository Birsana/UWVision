import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import {
  FormInput,
  FormErrorMessage,
  FormSubmitButton,
} from "components/Modals/styles";

import { resetPassword } from "backendActions";

const ForgotPasswordTitle = styled.h2`
  font-size: 32px;
  @media (max-width: 600px) {
    font-size: 28px;
  }
  @media (max-width: 520px) {
    font-size: 24px;
  }
`

const ForgotPasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Formatting/styles need to be updated (this is a placeholder)
const ForgotPasswordPage = (props) => {
  // User reset token
  const resetToken = props.match.params.resetToken;

  // Form states
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formSubmissionError, setFormSubmissionError] = useState("");

  // Deals with the password field's inputs
  const passwordInputChange = (event) => {
    setPassword(event.target.value);

    // Removes error once user begins typing inside password field
    if (passwordError) {
      setPasswordError("");
    }
  };

  // Deals with the password field's inputs
  const confirmPasswordInputChange = (event) => {
    setConfirmPassword(event.target.value);

    // Removes error once user begins typing inside password field
    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
  };

  const basicInputValidation = () => {
    // User cannot submit an empty password
    if (!password) {
      setPasswordError("Please enter a new password.");
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
      setConfirmPasswordError("Please confirm your password.");
      return false;
    }
    // Passwords must match
    else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (basicInputValidation()) {
      resetPassword(password, resetToken)
        .then((response) => {
          props.history.push("/");
        })
        .catch((err) => {
          setFormSubmissionError("Password change unsuccessful!");
        });
    }
  };

  return (
    <div className="container" style={{margin: "0 auto"}}>
      <ForgotPasswordForm>
        <ForgotPasswordTitle>Set a New Password</ForgotPasswordTitle>
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
          <FormInput
            type="password"
            name="NewPassword"
            placeholder="New Password"
            onChange={passwordInputChange}
            value={password}
            autoFocus={true}
            maxLength={64}
          />
          {passwordError && (
            <FormErrorMessage>
              <p>{passwordError}</p>
            </FormErrorMessage>
          )}
          <FormInput
            type="password"
            name="ConfirmNewPassword"
            placeholder="Confirm New Password"
            onChange={confirmPasswordInputChange}
            value={confirmPassword}
            maxLength={64}
          />
          {confirmPasswordError && (
            <FormErrorMessage>
              <p>{confirmPasswordError}</p>
            </FormErrorMessage>
          )}
          <FormSubmitButton value="Change Password" />
          {formSubmissionError && (
            <FormErrorMessage>
              <p>{formSubmissionError}</p>
            </FormErrorMessage>
          )}
        </form>
      </ForgotPasswordForm>
    </div>
  );
};

export default withRouter(ForgotPasswordPage);
