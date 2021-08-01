import React, { useState } from "react";
import {
  ModalTitle,
  FormInput,
  FormSubmitButton,
  FormErrorMessage,
  ModalText,
} from "../styles";
import { connect } from "react-redux";
import { postSalary } from "backendActions";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const SalaryModal = (props) => {
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");

  const salaryChange = (event) => {
    const newSalary = event.target.value;
    setSalary(newSalary);

    if (!isNumeric(newSalary)) {
      setError("Salary must be a positive integer");
      return;
    }

    const salaryAsInt = parseInt(newSalary);
    if (salaryAsInt > 300) {
      setError("Salary must be less than $300");
      return;
    }

    if (salaryAsInt === 0) {
      setError("Salary must be greater than $0");
      return;
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error !== "") {
      return;
    }

    if (salary.length === 0) {
      setError("Salary cannot be empty");
      return;
    }

    postSalary(props.company, props.job, props.token, salary).then((res) => {
      if (res.data === "already posted") {
        setError("You can only report the salary of a job once!");
      } else {
        props.onSubmit(res.data);
        props.onClose(false);
      }
    });
  };

  return (
    <>
      <ModalTitle title={"Add salary"} />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <ModalText style={{ marginBottom: 4, marginLeft: 4, fontSize: 16 }}>
          What was your hourly wage at {props.company} (in CAD)?
        </ModalText>
        <FormInput
          type="number"
          min={0}
          max={300}
          name="salary"
          placeholder="Hourly wage..."
          onChange={salaryChange}
          value={salary}
          autoFocus={true}
        />
        {error && (
          <FormErrorMessage>
            <p>{error}</p>
          </FormErrorMessage>
        )}
        <FormSubmitButton style={{ marginBottom: 20 }} value="Enter" />
      </form>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(SalaryModal);
