import React, { useEffect, useState } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";

import { connect } from "react-redux";
import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";
import AddJobButton from "components/AddJobButton/AddJobButton";
import "./styles.css";

import JobBox from "components/CompanyPageComponents/JobBox";
import { getCompany, getAllJobsForCompany } from "backendActions";

const CompanyPage = (props) => {
  const company = props.match.params.id;
  const [companyData, setCompanyData] = useState({});
  const [companySummary, setCompanySummary] = useState({});
  const [jobData, setJobData] = useState([]);
  const [isCompanyValid, setIsCompanyValid] = useState(null);

  const getCompanyInfo = () => {
    let companyNameTrunc = company.replace(/\s/g, '-');
    
    getCompany(companyNameTrunc)
      .then((response) => {
        setCompanyData(response.data);
        
        // Fetch job data and overall metrics (average company rating, and # of ratings)
        getAllJobsForCompany(companyNameTrunc, props.token).then((response) => {
          setCompanySummary(response.data.company_summary);    
          setJobData(response.data.jobs);
        })

        setIsCompanyValid(true);
      })
      .catch((error) => {
        setIsCompanyValid(false);
      });
  };

  useEffect(() => {
    getCompanyInfo();
  }, [company, props.isLoggedIn, props.token]);

  const renderView = (doesCompanyExist) => {
    switch (doesCompanyExist) {
      case true:
        return (
          <div className="companyTitle">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="companyTitle">
                <h1 className="company-name">{companyData.name}</h1>
              </div>
              {(companySummary.overall_review_count === null || companySummary.overall_review_count === 0) ? (
                <h2 className="company-stats" style={{ color: "#2196f3" }}>
                  No reviews
                </h2>
              ) : (
                <h2 className="company-stats">
                  <span className="companyRating">
                    {companySummary.avg_company_rating} out of 5
                  </span>
                  <span className="textDivider"> | </span>
                  <span>{companySummary.overall_review_count} reviews </span>
                </h2>
              )}
            </div>
            <div style={{ width: "max-content", marginLeft: 20 }}>
              <AddJobButton companyId={companyData.id} />
            </div>
          </div>
        );

      case false:
        return (
          <div className="invalidCompany">
            {company} hasn't been added yet!
            <HiOutlineEmojiSad
              style={{ marginTop: 10 }}
              size={96}
              color="rgba(0, 0, 0, 0.1)"
            />
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
      {isCompanyValid && <JobBox company={companyData.name} jobs={jobData} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(CompanyPage);
