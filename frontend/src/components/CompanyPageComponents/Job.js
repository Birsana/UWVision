import styled from "styled-components";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SaveJobButton from "./SaveJobButton";

const JobElement = styled.div`
  padding: 24px 36px;
  border-radius: 4px;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  @media (hover: hover) and (pointer: fine),
    only screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) {
    &:hover {
      background-color: #ececec;
      cursor: pointer;
    }
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
  overflow-wrap: break-word;
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

  const companyName = props.company;
  const jobName = props.job.name;
  const jobId = props.job.id;

  const handleSelection = (event) => {
    props.history.push(`/company/${companyName}/job/${jobName}`);
  };

  return (
    <JobElement onClick={handleSelection}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <JobTitle>
          <h2>{jobName}</h2>
        </JobTitle>
        {!isMobile && (
          <SaveJobButton
            companyName={companyName}
            jobId={jobId}
            isSaved={props.job.saved}
            accountPage={props.accountPage}
          />
        )}
      </div>
      <JobMetrics>
        <h3>
          {props.job.avg_overall_rating ? (
            <>
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                {props.job.avg_overall_rating}/5
              </span>
              <span> ({props.job.review_count} reviews)</span>
            </>
          ) : (
            <span>No reviews</span>
          )}
          <span> | </span>
          {props.job.avg_hourly_wage ? (
            <>
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                {" "}
                ${props.job.avg_hourly_wage}/hr
              </span>
              <span> ({props.job.salary_count} entries)</span>
            </>
          ) : (
            <span>No salaries</span>
          )}
        </h3>
      </JobMetrics>
      {isMobile && (
        <div style={{ marginLeft: -5 }}>
          <SaveJobButton
            companyName={companyName}
            jobId={jobId}
            isSaved={props.job.saved}
            accountPage={props.accountPage}
          />
        </div>
      )}
    </JobElement>
  );
};

export default withRouter(Job);
