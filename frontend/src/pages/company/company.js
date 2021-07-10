import React, { useEffect, useState } from "react";

import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";
import AddJobButton from "components/AddJobButton/AddJobButton";
import "./styles.css";

import JobBox from "components/CompanyPageComponents/JobBox";
import { getCompany } from "backendActions";

const CompanyPage = (props) => {
  const company = props.match.params.id;
  const [companyData, setCompanyData] = useState({});
  const [isCompanyValid, setIsCompanyValid] = useState(null);

  useEffect(() => {
    getCompany(company)
      .then((response) => {
        setCompanyData(response.data);
        setIsCompanyValid(true);
      })
      .catch((error) => {
        setIsCompanyValid(false);
      });
  }, [company]);

  const renderView = (doesCompanyExist) => {
    //TODO: Refactor all the returns to use sub-components
    switch (doesCompanyExist) {
      case true:
        return (
          <div className="companyInfo">
            <div className="companyTitle">
              <h1>{company}</h1>
              <AddJobButton />
            </div>
            {companyData.numReviews === 0 ? (
              <h2 style={{ color: "#2196f3" }}>No reviews</h2>
            ) : (
              <h2>
                <span className="companyRating">
                  {companyData.averageRating} out of 10
                </span>
                <span className="textDivider"> | </span>
                <span className="numberOfReviews">
                  {companyData.numReviews} reviews{" "}
                </span>
              </h2>
            )}
          </div>
        );

      case false:
        return (
          <div className="invalidCompany">
            <h2>The requested company "{company}" does not exist :(</h2>
            <h4>Would you like to add it to the database?</h4>
            <AddCompanyButton />
          </div>
        );

      default:
        return <div></div>;
    }
  };

  return (
    <div className="container">
      {renderView(isCompanyValid)}
      {isCompanyValid && <JobBox company={company} />}
    </div>
  );
};

export default CompanyPage;
