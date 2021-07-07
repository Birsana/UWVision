import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import { connect } from "react-redux";
import { postSalary } from "../../../backendActions/jobUtils"

const SalaryModal = (props) => {
    const [salary, setSalary] = useState("")

    const handleClick = async () => {
        postSalary(props.company, props.job, props.token, salary)
            .then((res) => {
                if (res.data === 'already posted') {
                  alert('You can only report the salary of a job once!')
                } else {
                  props.onSubmit(res.data);
                  props.onClose();
                }
            });
    }
    
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
                What was your hourly rate (in CAD)?
            </Typography>
            <TextField
                placeholder = "Hourly rate in CAD"
                inputProps = {{maxLength: 300}}
                value = {salary}
                onChange={(event) => {setSalary(event.target.value)}}
            />
            <Button variant= "contained" size="small" onClick = {handleClick}>
                Submit
            </Button>
      </div>
    );
  };

  // Injecting redux states into props for modal
  const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
  export default connect(mapStateToProps)(SalaryModal);