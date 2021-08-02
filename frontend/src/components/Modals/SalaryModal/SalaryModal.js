import React from "react";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
  ModalText,
} from "../styles";
import { connect } from "react-redux";
import { postSalary } from "backendActions";
import { Formik, Form, Field } from "formik";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const SalaryModal = (props) => {
  const { company, job, token, onSubmit, onClose } = props;

  const validateSalary = (salary) => {
    let error = "";
    if (!salary || salary.length === 0) {
      error = "Salary cannot be blank";
    }
    if (!isNumeric(salary)) {
      error = "Salary must be a positive integer";
    }
    const salaryAsInt = parseInt(salary);
    if (salaryAsInt > 300) {
      error = "Salary must be less than $300";
    }
    if (salaryAsInt === 0) {
      error = "Salary must be greater than $0";
    }
    return error;
  };

  return (
    <>
      <ModalTitle title={"Add salary"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          salary: "",
        }}
        onSubmit={(values, actions) => {
          postSalary(company, job, token, values.salary)
            .then((res) => {
              if (res.data === "already posted") {
                actions.setErrors({
                  salary: "Cannot report salary more than once",
                });
                actions.setSubmitting(false);
              } else {
                onSubmit(res.data);
                onClose(false);
              }
            })
            .catch((err) => {
              actions.setErrors({ salary: "An error occured" });
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
              What was your hourly wage (CAD) at {company}?
            </ModalText>
            <Field
              type="number"
              name="salary"
              min={0}
              max={300}
              placeholder="Hourly wage (CAD)..."
              autoFocus={true}
              as={FormInput}
              validate={validateSalary}
            />
            {props.errors.salary && (
              <FormErrorMessage>
                <p>{props.errors.salary}</p>
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

export default connect(mapStateToProps)(SalaryModal);
