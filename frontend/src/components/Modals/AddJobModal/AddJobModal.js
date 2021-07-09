import { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  ModalTitle,
  ModalText,
  ModalButton,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

import { addJob } from "backendActions";

const AddJobModal = (props) => {
  const company = props.match.params.id;

  // User states (from redux)
  const [isLoggedIn] = useState(props.isLoggedIn);
  const [authToken] = useState(props.token);

  // Modal States:
  const [jobToAdd, setJobToAdd] = useState("");
  const [jobError, setJobError] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);

  // Basic Validation - ensures the user is not submitting an empty company name
  const basicInputValidation = () => {
    if (!jobToAdd) {
      setJobError("The job title cannot be blank.");
      return false;
    }

    //max job length is 50 characters
    if(jobToAdd.length > 50) {
        setJobError("The job can't be longer than 50 characters");
        return false;
    }


    // NOTE: Permissible characters for the URL are the following:
    // A-Z, a-z, 0-9, "-", "_", ".", "!", "~", "*", "'", "(", ")"
    // These are unreserved characters
    let validChars = /^[a-zA-Z ]+$/;
    if (!validChars.test(jobToAdd)) {
      setJobError("The job name cannot contain special characters.");
      return false;
    }

    return true;
  };

  const onInputChange = (event) => {
    setJobToAdd(event.target.value);

    // Removes error once user begins typing again
    if (jobError) {
      setJobError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (basicInputValidation()) {
        addJob(company, jobToAdd, authToken).then((response) => {setDidSubmit(true)}).catch((response) => {setJobError("This job already exists!")});
    }
  };

  const goToJob = () => {
    let destination = `/company/${company}/job/${jobToAdd}`
    props.history.push(destination);
  }

  return (
    <>
      <ModalTitle title={"Add Job"} />
      {isLoggedIn ? (
        <>
          {!didSubmit ? (
            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                onChange={onInputChange}
                autoComplete="off"
                value={jobToAdd}
              />
              {jobError && (
                <FormErrorMessage>
                  <p>{jobError}</p>
                </FormErrorMessage>
              )}
              <FormSubmitButton value="Add Job" />
            </form>
          ) : (
            <>
              <ModalText>
                The job "<b>{jobToAdd}</b>" has been successfully added to the database!
              </ModalText>
              <ModalText>
                Would you like to start adding information for this job?
              </ModalText>
              <ModalButton onClick={goToJob}>Get Started!</ModalButton>
            </>
          )}
        </>
      ) : (
        <>
          <ModalText>
            In order to add a company, you must first be logged-in.
          </ModalText>
          <ModalText>Please log in and then try again!</ModalText>
        </>
      )}
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(withRouter(AddJobModal));
