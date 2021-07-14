import { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
} from "../styles";

import { addJob } from "backendActions";

const AddJobModal = (props) => {
  const company = props.match.params.id;

  // User states (from redux)
  const [authToken] = useState(props.token);

  // Modal States:
  const [jobToAdd, setJobToAdd] = useState("");
  const [jobError, setJobError] = useState("");

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
        addJob(company, jobToAdd, authToken)
          .then((res) => {
            props.history.push(`/company/${company}/job/${jobToAdd}`);
          })
          .catch((err) => {
            setJobError("This job already exists!")
          });
    }
  };

  return (
    <>
      <ModalTitle title={"Add Job"} />
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
        <FormInput
          maxLength={100}
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          onChange={onInputChange}
          autoComplete="off"
          value={jobToAdd}
          autoFocus={true}
        />
        {jobError && (
          <FormErrorMessage>
            <p>{jobError}</p>
          </FormErrorMessage>
        )}
        <FormSubmitButton value="Add Job" />
      </form>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(withRouter(AddJobModal));
