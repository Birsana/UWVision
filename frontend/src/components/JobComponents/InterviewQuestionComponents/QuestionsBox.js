import React, { useState, useEffect } from 'react';
import axios from "axios";
import QuestionForm from "components/JobComponents/InterviewQuestionComponents/QuestionForm";
import QuestionList from "components/JobComponents/InterviewQuestionComponents/QuestionList";

function QuestionsBox(props){

    const [questions, setQuestions] = useState(null);

    var questionsData = []
    
    const fetchQuestions= async () => {
        await axios.get("http://localhost:5000/job/Apple/Friend/questions", {
            headers: {
                //   Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                }
        }).then(response => {
            let data = response.data;
            data.forEach(question => {
                questionsData.push(question);
              });
        });
    };

    useEffect( async () => {
        await fetchQuestions();
        setQuestions(
           questionsData
        );
      }, []);

    return(
        <div classname = "QuestionsBox">
            <h1> Interview Questions </h1>
            <QuestionList data = {questions} style={
    {
     border: '2px solid red'
    }
  }/>
            <QuestionForm/>
        </div>
    );

}

export default QuestionsBox;