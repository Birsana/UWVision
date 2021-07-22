import React, { useEffect, useState } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";

import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";
import AddJobButton from "components/AddJobButton/AddJobButton";
import "./styles.css";

import JobBox from "components/CompanyPageComponents/JobBox";
import { getCompany } from "backendActions";

const CompanyPage = (props) => {
  const company = props.match.params.id;
  const [companyData, setCompanyData] = useState({});
  const [isCompanyValid, setIsCompanyValid] = useState(null);

  const getCompanyInfo = () => {
    getCompany(company)
      .then((response) => {
        setCompanyData(response.data);
        setIsCompanyValid(true);
      })
      .catch((error) => {
        setIsCompanyValid(false);
      });
  }

  useEffect(() => {
    getCompanyInfo();
  }, [company]);

  const renderView = (doesCompanyExist) => {
    switch (doesCompanyExist) {
      case true:
        return (
          <div className="companyTitle">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="companyTitle">
                <h1 className="company-name">{companyData.companyName}</h1>
              </div>
              {companyData.numReviews === 0 ? (
                <h2 className="company-stats" style={{ color: "#2196f3" }}>No reviews</h2>
              ) : (
                <h2 className="company-stats">
                  <span className="companyRating">
                    {companyData.averageRating} out of 5
                  </span>
                  <span className="textDivider"> | </span>
                  <span>
                    {companyData.numReviews} reviews{" "}
                  </span>
                </h2>
              )}
            </div>
            <div style={{ width: "max-content", marginLeft: 20 }}>
              <AddJobButton />
            </div>
          </div>
        );

      case false:
        return (
          <div className="invalidCompany">
            {company} hasn't been added yet!
            <HiOutlineEmojiSad style={{ marginTop: 10 }} size={96} color="rgba(0, 0, 0, 0.1)" />
            <div style={{ marginTop: 20 }}>
              <AddCompanyButton onClose={getCompanyInfo} company={company} />
            </div>
          </div>
        );

      default:
        return <div></div>;
    }
  };

  return (
    <div className="container company-container">
      {renderView(isCompanyValid)}
      {isCompanyValid && <JobBox company={companyData.companyName} />}
    </div>
  );
};

export default CompanyPage;
