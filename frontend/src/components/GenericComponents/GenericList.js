import React, { useState, useEffect } from 'react';
import Thread from "components/JobComponents/ThreadsComponents/Thread";
import InterviewQuestion from "components/JobComponents/InterviewQuestionComponents/InterviewQuestion";
import Reply from "components/JobComponents/ThreadsComponents/Replies/Reply"

function GenericList(props){

    var elements = (props.data) ?
        
        props.data.dataArr.map(function (element) {
            if(props.data.type == "thread"){
                return (
                    <Thread author={element.author} date = {element.date}>
                      {element.title}
                    </Thread>
                  );
            } else {
                return (
                    <InterviewQuestion author={element.author} upvoters = {element.upvoters}>
                      {element.body}
                    </InterviewQuestion>
                  );
            }
        
      }) : null;


    return(
        <div classname = "threadList">
            {elements}
        </div>
    );

}

export default GenericList;