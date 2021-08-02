import { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import { Formik, Form, Field } from "formik";
import { addJob } from "backendActions";

const AddJobModal = (props) => {
  const company = props.match.params.id;
  const [authToken] = useState(props.token);

  const validateJob = (job) => {
    let error = "";
    let validChars = /^[a-zA-Z ]+$/; // A-Z, a-z, 0-9, " "
    if (!validChars.test(job)) {
      error = "Job title cannot contain special characters";
    }
    if (!job || job.trim().length === 0) {
      error = "Job title cannot be blank";
    }
    if (job.length > 50) {
      error = "Job title cannot be longer than 50 characters";
    }
    return error;
  };

  return (
    <>
      <ModalTitle title={"Add Job"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          job: "",
        }}
        onSubmit={(values, actions) => {
          addJob(company, values.job, authToken)
            .then((res) => {
              props.history.push(`/company/${company}/job/${values.job}`);
            })
            .catch((err) => {
              actions.setErrors({ job: "Job already exists" });
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
              marginBottom: 10,
            }}
          >
            <Field
              type="text"
              name="job"
              maxLength={100}
              placeholder="Job Title"
              autoFocus={true}
              autoComplete="off"
              as={FormInput}
              validate={validateJob}
            />
            {props.errors.job && (
              <FormErrorMessage>
                <p>{props.errors.job}</p>
              </FormErrorMessage>
            )}
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              value="Add Job"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(withRouter(AddJobModal));
