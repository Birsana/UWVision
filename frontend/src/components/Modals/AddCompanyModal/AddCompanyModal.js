import React, { useState } from "react";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import { Formik, Form, Field } from "formik";
import { addCompany } from "backendActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AddCompanyModal = (props) => {
  const [authToken] = useState(props.token);

  const validateCompany = (company) => {
    let error = "";
    let validChars = /^(?:[A-Za-z0-9 ]*)$/g; // A-Z, a-z, 0-9, " "
    if (!validChars.test(company)) {
      error = "Company name cannot contain special characters";
    }
    if (!company || company.trim().length === 0) {
      error = "Company name cannot be blank";
    }
    if (company.length > 50) {
      error = "Company name cannot be longer than 50 characters";
    }
    return error;
  };

  return (
    <>
      <ModalTitle title={"Add Company"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          company: "",
        }}
        onSubmit={(values, actions) => {
          addCompany(values.company, authToken)
            .then((res) => {
              if (props.onClose) {
                props.onClose();
              }
              props.history.push(`/company/${values.company}`);
            })
            .catch((err) => {
              actions.setErrors({ company: "Company already exists" });
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
              name="company"
              maxLength={100}
              placeholder="Company Name"
              autoFocus={true}
              autoComplete="off"
              as={FormInput}
              validate={validateCompany}
            />
            {props.errors.company && (
              <FormErrorMessage>
                <p>{props.errors.company}</p>
              </FormErrorMessage>
            )}
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              value="Add Company"
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

export default connect(mapStateToProps)(withRouter(AddCompanyModal));
