import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import axios from "axios";


const InterviewModal = (props) => {
    const [question, setQuestion] = useState("")

    const handleClick = async () => {
        await axios.post(`http://localhost:5000/job/${props.company}/${props.job}/question`, question, {
            headers: {
                   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjk3NzdjYjJlYjcxZThiNmZiZTc2NCIsInVzZXJuYW1lIjoiYW5kcmUiLCJleHAiOjE2MzMyODM2MDQsImlhdCI6MTYyMjkxNTYwNH0.VfwMV9vwp54S_g-H_HsnVDzZ-i8gEtuCzfVJijidgmM`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
            question
        }).then({
            //CLOSE MODAL HERE
        });
    }
    
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography>
                What interview question were you asked?
            </Typography>
            <TextField
                placeholder = "Interview question..."
                inputProps = {{maxLength: 300}}
                value = {question}
                onChange={(event) => {setQuestion(event.target.value)}}
            />
            <Button variant= "contained" size="small" onClick={handleClick}>
                Submit
            </Button>
      </div>
    );
  };
  
  export default InterviewModal;