import React, { useState} from "react";
import {
    ModalTitle,
    FormTextarea,
    FormSubmitButton,
    FormErrorMessage,
    ModalText,
  } from "../styles";
import { postQuestion } from "backendActions"
import { connect } from "react-redux";

const InterviewModal = (props) => {
    const [question, setQuestion] = useState("")
    const [error, setError] = useState("")

    const questionChange = (event) => {
        setQuestion(event.target.value);

        if (error) {
            setError("");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/\S/.test(question)) {
            setError("Interview question cannot be blank");
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
        <>
            <ModalTitle title={"Add question"} />
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
                <ModalText style={{ marginBottom: 4, marginLeft: 4, fontSize: 16 }}>
                    What interview question were you asked at {props.company}?
                </ModalText>
                <FormTextarea
                    maxLength={500}
                    type="text"
                    name="question"
                    placeholder="Interview question..."
                    onChange={questionChange}
                    value={question}
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
  
  export default connect(mapStateToProps)(InterviewModal);