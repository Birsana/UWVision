import React, { useState, useEffect } from "react";
import axios from "axios";
import ThreadForm from "components/JobComponents/ThreadsComponents/ThreadForm";
import QuestionForm from "components/JobComponents/InterviewQuestionComponents/QuestionForm";
import GenericList from "components/GenericComponents/GenericList";
import ReplyForm from "components/JobComponents/ThreadsComponents/Replies/ReplyForm";
import styled from "styled-components";

//TODO: Fix weird scaling behaviour for width + max-height (responsive)
const JobScrollableDiv = styled.div`
  margin-left: 100px;
  margin-top: 40px;
  width: -webkit-calc(100% - 210px);
  max-height: 65vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const JobListDiv = styled.div`
  margin-top: -13px;
  margin-bottom: -25px;
`;

//TODO: modify data that is being called based on which box it is

function GenericBox(props) {
  const company = props.company;
  const [data, setData] = useState(null);

  useEffect(() => {
    var dataArr = [];

    var urls = [
      "http://localhost:5000/job/Apple/Friend/threads",
      "http://localhost:5000/job/Apple/Friend/questions",
      "http://localhost:5000/job/Apple/Friend/salary-b69fwx/replies",
      `http://localhost:5000/data/findCompanyData/${company}`,
    ];

    async function fetchData() {
      var url;
      if (props.box === "thread") {
        url = urls[0];
      } else if (props.box === "question") {
        url = urls[1];
      } else if (props.box === "reply") {
        url = urls[2];
      } else if (props.box === "job") {
        url = urls[3];
      }
      await axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then((response) => {
          let data = response.data;
          data.forEach((thread) => {
            dataArr.push(thread);
          });
          setData({
            dataArr: dataArr,
            type: props.box,
          });
        });
    }
    fetchData();
  }, [props]);

  const BoxToRender = () => {
    if (props.box === "thread") {
      return (
        <div className="ThreadsBox">
          <h1> Threads </h1>
          <GenericList data={data} />
          <ThreadForm />
        </div>
      );
    } else if (props.box === "question") {
      return (
        <div className="QuestionsBox">
          <h1> Interview Questions </h1>
          <GenericList data={data} />
          <QuestionForm />
        </div>
      );
    } else if (props.box === "reply") {
      return (
        <div className="RepliesBox">
          <h1> Replies </h1>
          <GenericList data={data} />
          <ReplyForm />
        </div>
      );
    } else if (props.box === "job") {
      return (
        <JobScrollableDiv>
          <JobListDiv>
            <GenericList data={data} />
          </JobListDiv>
        </JobScrollableDiv>
      );
    }
  };

  return (
    <div>
      <BoxToRender />
    </div>
  );
}

export default GenericBox;
