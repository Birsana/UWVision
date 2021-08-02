import React from "react";
import {
  ModalTitle,
  FormTextarea,
  FormSubmitButton,
  FormErrorMessage,
  ModalText,
} from "../styles";
import { postQuestion } from "backendActions";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

const InterviewModal = (props) => {
  const { company, job, token, onSubmit, onClose } = props;

  const validateQuestion = (question) => {
    let error = "";
    if (!question || question.trim().length === 0) {
      error = "Interview question cannot be blank";
    }
    return error;
  };

  return (
    <>
      <ModalTitle title={"Add question"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          question: "",
        }}
        onSubmit={(values, actions) => {
          postQuestion(company, job, token, values.question)
            .then((res) => {
              res.data.upvoted = false;
              onSubmit(res.data);
              onClose(false);
            })
            .catch((err) => {
              actions.setErrors({ question: "An error occured" });
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
            <ModalText style={{ marginBottom: 4, marginLeft: 4, fontSize: 16 }}>
              What interview question were you asked at {company}?
            </ModalText>
            <Field
              type="text"
              name="question"
              maxLength={1000}
              placeholder="Interview question..."
              autoFocus={true}
              as={FormTextarea}
              validate={validateQuestion}
            />
            {props.errors.question && (
              <FormErrorMessage>
                <p>{props.errors.question}</p>
              </FormErrorMessage>
            )}
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              style={{ marginBottom: 20 }}
              value="Enter"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(InterviewModal);
