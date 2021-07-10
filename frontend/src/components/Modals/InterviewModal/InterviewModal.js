import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'
import { postQuestion } from "backendActions"
import { connect } from "react-redux";

const InterviewModal = (props) => {
    const [question, setQuestion] = useState("")

    const handleClick = async () => {
        if (!/\S/.test(question)) {
            alert("Your interview question must not be blank!")
            return;
        }
        
        postQuestion(props.company, props.job, props.token, question)
            .then((res) => {
                res.data.upvoted = false;
                props.onSubmit(res.data);
                props.onClose();
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
  
  // Injecting redux states into props for modal
  const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
  export default connect(mapStateToProps)(InterviewModal);