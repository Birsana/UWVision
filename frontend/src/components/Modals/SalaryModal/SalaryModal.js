import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import axios from "axios";
import { connect } from "react-redux";

const SalaryModal = (props) => {
    const [salary, setSalary] = useState("")

    const handleClick = async () => {
        await axios({
            method: "POST",
            url: `http://localhost:5000/job/${props.company}/${props.job}/salary`,
            data: {
              salary: {
                  wage: salary
              }
            },
            headers: {
              Authorization: `Token ${props.token}`,
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
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