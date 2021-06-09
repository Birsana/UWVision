import styled from "styled-components";
import { withRouter } from 'react-router-dom';

const JobElement = styled.div`
  height: 195px;
  border-radius: 20px;
  background-color: #99e7ff;
  margin-right: 20px;
  margin-bottom: 25px;

  p {
    margin-left: 20px;
    color: #99e7ff;
  }

  &:hover {
    background-color: #BDC7CB;
    cursor: pointer;

    p {
      color: #BDC7CB;
    }
  }
`;

const JobTitle = styled.div`
  h2 {
    font-family: Roboto Mono;
    font-size: 36px;
    font-weight: bold;
    margin-left: 40px;
    margin-top: -10px;
  }
`;

const JobMetrics = styled.div`
  margin-left: 105px;
  margin-top: -20px;

  h3 {
    font-family: Roboto Mono;
    font-size: 24px;
    font-style: normal;
    margin-top: -15px;
  }
`;

const Job = (props) => {
  const handleSelection = (jobName) => {
    props.history.push(props.location.pathname + "/job/" + jobName);
  }

  return (
    <JobElement onClick={() => handleSelection(props.jobData.jobName)}>
      <p>blank</p>
      <JobTitle>
        <h2>
          {">"} {props.jobData.jobName}
        </h2>
      </JobTitle>
      <JobMetrics>
        <h3>
          <span className="jobRating">{props.jobData.averageRating}</span>
          <span className="textDivider"> | </span>
          <span className="numberOfReviewsJob">{props.jobData.numOfReviews} reviews</span>
        </h3>
        <h3>
          <span className="jobRating">${props.jobData.averageSalary}/hr</span>
          <span className="textDivider"> | </span>
          <span className="numberOfReviewsJob">{props.jobData.numOfSalaryEntries} entries</span>
        </h3>
      </JobMetrics>
    </JobElement>
  );
};

export default withRouter(Job);
