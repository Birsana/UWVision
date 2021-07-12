import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SaveJobButton from './SaveJobButton';

const JobElement = styled.div`
  padding: 28px 40px;
  border-radius: 14px;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  &:hover {
    background-color: #ececec;
    cursor: pointer;
  }
  @media (max-width: 820px) {
    padding: 20px 30px;
  }
  @media (max-width: 520px) {
    padding: 16px 20px 10px 20px;
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
  @media (max-width: 1055px) {
    h2 {
      font-size: 20px;
    }
  }
  @media (max-width: 520px) {
    max-width: 100%;
    margin-bottom: 6px;
    h2 {
      font-size: 18px;
    }
  }
`;

const JobMetrics = styled.div`
  h3 {
    font-weight: normal;
    margin: 0;
    font-size: 16px;
  }
  @media (max-width: 1055px) {
    h3 {
      margin-top: -2px;
    }
  }
`;

const Job = (props) => {
  const isMobile = useMediaQuery("(max-width: 520px)");

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
        { !isMobile && <SaveJobButton companyName={companyName} jobName={jobName} isSaved={props.jobData.isSaved} accountPage={props.accountPage}/> }
      </div>
      <JobMetrics>
        <h3>
          <span style={{ color: "#2196f3", fontWeight: "bold" }}>
            {props.jobData.averageRating ? props.jobData.averageRating : "-"}
          </span>
          <span>
            {" "}
            ({props.jobData.numOfReviews} reviews)
          </span>
          <span> | </span>
          <span style={{ color: "#2196f3", fontWeight: "bold" }}>
            {" "}
            {props.jobData.averageSalary
              ? `$${props.jobData.averageSalary}/hr`
              : "-"}
          </span>
          <span>
            {" "}
            ({props.jobData.numOfSalaryEntries} entries)
          </span>
        </h3>
      </JobMetrics>
      { isMobile && <SaveJobButton companyName={companyName} jobName={jobName} isSaved={props.jobData.isSaved} accountPage={props.accountPage}/> }
    </JobElement>
  );
};

export default withRouter(Job);
