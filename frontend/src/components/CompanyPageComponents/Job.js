import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import SaveJobButton from './SaveJobButton';

const JobElement = styled.div`
  padding: 28px 40px;
  border-radius: 20px;
  background-color: #f5f5f5;
  margin-bottom: 15px;

  &:hover {
    background-color: #ececec;
    cursor: pointer;
  }
`;

const JobTitle = styled.div`
  max-width: calc(100% - 100px);
  word-break: break-all;
  h2 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
  }
`;

const JobMetrics = styled.div`
  h3 {
    font-weight: normal;
    margin: 0;
  }
`;

const Job = (props) => {
  const companyName = props.jobData.company;
  const jobName = props.jobData.jobName;

  const handleSelection = (event) => {
    props.history.push(`/company/${companyName}/job/${jobName}`);
  }

  return (
    <JobElement onClick={handleSelection}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
        <JobTitle>
          <h2>{props.jobData.jobName}</h2>
        </JobTitle>
        <SaveJobButton companyName={companyName} jobName={jobName} isSaved={props.jobData.isSaved} accountPage={props.accountPage}/>
      </div>
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
              ? `$${props.jobData.averageSalary}/hr`
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
