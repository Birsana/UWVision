import React from "react";
import Job from "./Job";
import Fade from "react-reveal/Fade";

function JobList(props) {
  var elements = props.jobs
    ? props.jobs.map((job) => {
        return (
          <Fade duration={500} key={job.name} exit={false}>
            <Job company={props.company} job={job} />
          </Fade>
        );
      })
    : null;

  return <div>{elements}</div>;
}

export default JobList;
