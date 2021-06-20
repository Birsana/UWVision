import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import { useState } from "react";

const JobElement = styled.div`
  height: 115px;
  border-radius: 20px;
  background-color: #F2F2F2;
  margin-right: 20px;
  margin-bottom: 25px;

  &:hover {
    background-color: #DEDEDE;
    cursor: pointer;
  }
`;

const JobTitle = styled.div`
  padding-top: 27px;
  margin-bottom: -50px;

  h2 {
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    margin-left: 40px;
  }
`;

const JobMetrics = styled.div`
  margin-left: 40px;

  h3 {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
  }
`;

const Job = (props) => {
  const handleSelection = (jobName) => {
    props.history.push(props.location.pathname + "/job/" + jobName);
  }

  return (
    <JobElement onClick={() => handleSelection(props.jobData.jobName)}>
      <JobTitle>
        <h2>{props.jobData.jobName}</h2>
      </JobTitle>
      <JobMetrics>
        <h3>
          <span className="jobRating">
            {props.jobData.averageRating ? props.jobData.averageRating : "-"}
          </span>
          <span className="numberOfReviewsJob">
            {" "}
            ({props.jobData.numOfReviews} reviews)
          </span>
          <span className="textDivider2"> | </span>
          <span className="jobRating">
            {" "}
            {props.jobData.averageSalary
              ? `\$${props.jobData.averageSalary}/hr`
              : "-"}
          </span>
          <span className="numberOfReviewsJob">
            {" "}
            ({props.jobData.numOfSalaryEntries} entries)
          </span>
        </h3>
      </JobMetrics>
    </JobElement>
  );
};

export default withRouter(Job);
