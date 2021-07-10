import React from "react";
import Job from "./Job";

function JobList(props) {
  var elements = props.data
    ? props.data.map(function (element) {
          return <Job key={element.jobName} jobData={element} />;
      })
    : null;

  return <div className="threadList">{elements}</div>;
}

export default JobList;
