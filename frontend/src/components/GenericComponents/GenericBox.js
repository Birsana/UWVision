import React, { useState, useEffect } from 'react';
import axios from "axios";
import ThreadForm from "components/JobComponents/ThreadsComponents/ThreadForm";
import QuestionForm from "components/JobComponents/InterviewQuestionComponents/QuestionForm";
import GenericList from "components/GenericComponents/GenericList"
import ReplyForm from "components/JobComponents/ThreadsComponents/Replies/ReplyForm";


//TODO: modify data that is being called based on which box it is

function GenericBox(props){

    const [data, setData] = useState(null);

    var dataArr = []

    var urls = ["http://localhost:5000/job/Apple/Friend/threads", "http://localhost:5000/job/Apple/Friend/questions",
    "http://localhost:5000/job/Apple/Friend/salary-b69fwx/replies"]
    
    const fetchData = async () => {
        var url;
        if(props.box == "thread"){
            url = urls[0];
        } else if(props.box == "question"){
            url = urls[1];
        }
        await axios.get(url, {
            headers: {
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                }
        }).then(response => {
            let data = response.data;
            data.forEach(thread => {
                dataArr.push(thread);
              });
            
        });
    };

    useEffect( async () => {
        await fetchData();
        setData({
            dataArr: dataArr,
            type: props.box
        }
        );
      }, []);

    const BoxToRender = () => {
        if(props.box == "thread"){
            return(
                <div classname = "threadsBox">
                    <h1> Threads </h1>
                    <GenericList data = {data}/>
                    <ThreadForm/>
                </div>
            );
        } else {
            return(
                <div classname = "QuestionsBox">
                    <h1> Interview Questions </h1>
                    <GenericList data = {data}/>
                    <QuestionForm/>
                </div>
            );
        }
    }

    return(
        <div>
            <BoxToRender/>
        </div>
    );


}

export default GenericBox;