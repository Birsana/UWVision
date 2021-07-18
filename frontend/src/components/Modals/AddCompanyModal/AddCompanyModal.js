import React, { useState } from "react";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

// Backend + Redux Imports:
import { addCompany } from "backendActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// ==============================================================================================================

// Add Company Modal:
const AddCompanyModal = (props) => {
  // States controlled by Redux:
  const [authToken] = useState(props.token);

  // Modal States:
  const [companyToAdd, setCompanyToAdd] = useState(props.company);
  const [companyError, setCompanyError] = useState("");

  // Basic Validation - ensures the user is not submitting an empty company name
  const basicInputValidation = () => {
    if (!companyToAdd) {
      setCompanyError("The company name cannot be blank.");
      return false;
    }

    // NOTE: Permissible characters for the URL are the following:
    // A-Z, a-z, 0-9, "-", "_", ".", "!", "~", "*", "'", "(", ")"
    // These are unreserved characters
    let validChars = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/g;
    if (!validChars.test(companyToAdd)) {
      setCompanyError("The company name cannot contain special characters.");
      return false;
    }

    //max company length is 50 characters
    if (companyToAdd.length > 50) {
      setCompanyError("The company can't be longer than 50 characters");
      return false;
    }

    return true;
  };

  // Handles submission of the Add Company form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      // If the company being added already exists in the database - set an error explaining the situation
      addCompany(companyToAdd, authToken)
        .then((res) => {
          props.history.push(`/company/${companyToAdd}`);
          if (props.onClose) {
            props.onClose();
          }
        })
        .catch((err) => {
          setCompanyError("This company already exists!");
        });
    }
  };

  // Deals with the form inputs
  const onInputChange = (event) => {
    setCompanyToAdd(event.target.value);

    // Removes error once user begins typing
    if (companyError) {
      setCompanyError("");
    }
  };

  return (
    <>
      <ModalTitle title={"Add Company"} />
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10 }} onSubmit={handleSubmit}>
        <FormInput
          maxLength={100}
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={onInputChange}
          autoComplete="off"
          value={companyToAdd}
          autoFocus={true}
        />
        {companyError && (
          <FormErrorMessage>
            <p>{companyError}</p>
          </FormErrorMessage>
        )}
        <FormSubmitButton value="Add Company" />
      </form>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(withRouter(AddCompanyModal));
