import React, { useState, useEffect } from 'react';
import InterviewQuestion from "components/JobComponents/InterviewQuestionComponents/InterviewQuestion";

function QuestionList(props){

    var questions = (props.data) ?
        props.data.map(function (question) {
        return (
          <InterviewQuestion author={question.author} upvoters = {question.upvoters}>
            {question.body}
          </InterviewQuestion>
        );
      }) : null;


    return(
        <div classname = "QuestionList">
            {questions}
        </div>
    );

}

export default QuestionList;