import React from "react";
import Job from "./Job";
import Fade from 'react-reveal/Fade';

function JobList(props) {
  var elements = props.data
    ? props.data.map(function (element) {
          return (
            <Fade duration={500} key={element.jobName}>
              <Job jobData={element} />
            </Fade>
          );
      })
    : null;

  return <div>{elements}</div>;
}

export default JobList;
