import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import axios from "axios";


const SalaryModal = (props) => {
    const [salary, setSalary] = useState("")

    const handleClick = async () => {
        await axios.post(`http://localhost:5000/job/${props.company}/${props.job}/salary`, salary, {
            headers: {
                   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjk3NzdjYjJlYjcxZThiNmZiZTc2NCIsInVzZXJuYW1lIjoiYW5kcmUiLCJleHAiOjE2MzMyODM2MDQsImlhdCI6MTYyMjkxNTYwNH0.VfwMV9vwp54S_g-H_HsnVDzZ-i8gEtuCzfVJijidgmM`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
            salary

        }).then({
            //CLOSE MODAL HERE
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
  
  export default SalaryModal;