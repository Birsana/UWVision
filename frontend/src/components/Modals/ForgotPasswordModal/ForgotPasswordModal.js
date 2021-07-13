import { useState } from "react";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

import { sendResetEmail } from "backendActions";

const ForgotPasswordModal = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Deals with the email field's inputs
  const emailInputChange = (event) => {
    setEmail(event.target.value);

    // Removes error once user begins typing inside email field
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetEmail(email)
      .then((response) => {
        props.onClose();
      })
      .catch((err) => {
        setEmailError("You have entered an invalid email.");
      });
  };

  return (
    <>
      <ModalTitle title={"Forgot Password"} />
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={emailInputChange}
          value={email}
          autoFocus={true}
        />
        {emailError && (
          <FormErrorMessage>
            <p>{emailError}</p>
          </FormErrorMessage>
        )}
        <FormSubmitButton value="Send Reset Email" />
      </form>
    </>
  );
};

export default ForgotPasswordModal;
