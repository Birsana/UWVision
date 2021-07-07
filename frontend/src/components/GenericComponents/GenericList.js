import React from "react";
import Job from "components/CompanyPageComponents/Job";

function GenericList(props) {
  var elements = props.data
    ? props.data.dataArr.map(function (element) {
          return <Job key={element.jobName} jobData={element} />;
      })
    : null;

  return <div className="threadList">{elements}</div>;
}

export default GenericList;
