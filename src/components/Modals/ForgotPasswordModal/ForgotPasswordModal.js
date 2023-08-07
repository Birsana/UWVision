import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import { Formik, Form, Field } from "formik";
import { sendResetEmail } from "backendActions";

const ForgotPasswordModal = (props) => {
  return (
    <>
      <ModalTitle title={"Forgot Password"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
        }}
        onSubmit={(values, actions) => {
          sendResetEmail(values.email)
            .then((res) => {
              props.onClose();
            })
            .catch((err) => {
              actions.setErrors({ email: "Invalid email provided" });
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
              marginBottom: 10,
            }}
          >
            <Field
              type="text"
              name="email"
              placeholder="Email"
              autoFocus={true}
              as={FormInput}
            />
            {props.errors.email && (
              <FormErrorMessage>
                <p>{props.errors.email}</p>
              </FormErrorMessage>
            )}
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              value="Send Reset Email"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordModal;
