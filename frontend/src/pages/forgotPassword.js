import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import {
  FormInput,
  FormErrorMessage,
  FormSubmitButton,
} from "components/Modals/styles";

import { resetPassword } from "backendActions";

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
    let isValid = true;

    // User cannot submit an empty password
    if (!password) {
      setPasswordError("Please enter a new password.");
      isValid = false;
    }

    // User cannot submit an empty confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    }
    // Passwords must match
    else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    //TODO: Regex validation
    //TODO: Check if new password is the same as the old password

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (basicInputValidation()) {
      resetPassword(password, resetToken)
        .then((response) => {
          props.history.push("/");
        })
        .catch((err) => {
          setFormSubmissionError("ERROR: Password change unsuccessful!");
        });
    }
  };

  return (
    <ForgotPasswordForm>
      <h2>Set a New Password</h2>
      <div style={{ width: "300px" }}>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="password"
            name="NewPassword"
            placeholder="New Password"
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
            name="ConfirmNewPassword"
            placeholder="Confirm New Password"
            onChange={confirmPasswordInputChange}
            value={confirmPassword}
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
      </div>
    </ForgotPasswordForm>
  );
};

export default withRouter(ForgotPasswordPage);
