import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ModalTitle,
  ModalText,
  ModalButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";
import { doesCompanyAlreadyExist, addCompany } from "./AddCompanyModal.helpers";

//TODO: Need some verification with backend if user has been logged in

const AddCompanyModal = ({ changeModalState }) => {
  const [companyToAdd, setCompanyToAdd] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);

  // Basic Validation - ensures the user is not submitting an empty company name
  const basicInputValidation = () => {
    if (!companyToAdd) {
      setCompanyError("The company name cannot be blank.");
      return false;
    }

    return true;
  };

  // Handles submission of the Add Company form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
      doesCompanyAlreadyExist(companyToAdd).then((result) => {
        // If the company being added already exists in the database - set an error explaining the situation
        if (result) {
          setCompanyError("This company already exists!");
        } 
        
        // Otherwise, we proceed to submit a new entry to the database
        else {
          addCompany(companyToAdd);
          setDidSubmit(true);
        }
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
      {!didSubmit ? (
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={onInputChange}
            autoComplete="off"
            value={companyToAdd}
          />
          {companyError && (
            <FormErrorMessage>
              <p>{companyError}</p>
            </FormErrorMessage>
          )}
          <FormSubmitButton value="Add Company" />
        </form>
      ) : (
        <>
          <ModalText>
            The company "<b>{companyToAdd}</b>" has been successfully added to
            the database!
          </ModalText>
          <ModalText>
            Would you like to start adding information for this company?
          </ModalText>
          <NavLink to={"/company/" + companyToAdd}>
            <ModalButton>Get Started!</ModalButton>
          </NavLink>
        </>
      )}
    </>
  );
};

export default AddCompanyModal;
