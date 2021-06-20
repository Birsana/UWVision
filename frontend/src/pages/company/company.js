import React, { useEffect, useState } from "react";
import axios from 'axios';

import AddCompanyButton from 'components/AddCompanyButton/AddCompanyButton';
import AddJobButton from "components/AddJobButton/AddJobButton";
import './styles.css';

import GenericBox from 'components/GenericComponents/GenericBox';

const CompanyPage = (props) => {
  const company = props.match.params.id;
  const [companyData, setCompanyData] = useState({})
  const [isCompanyValid, setIsCompanyValid] = useState(null);

  useEffect(() => {
    const request = `http://localhost:5000/data/company/${company}`;
    axios.get(request)
      .then((response) => {
        setCompanyData(response.data)
        setIsCompanyValid(true);
      })
      .catch((error) => {
        setIsCompanyValid(false);
      })
  }, [company]);
 
  //<span style="companyRating">Rating</span>  <span style="numberOfReviews"># of reviews</span>
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
            <h2>
              <span className="companyRating">{companyData.averageRating} out of 10</span>
              <span className="textDivider"> | </span>
              <span className="numberOfReviews">{companyData.numReviews} reviews </span>
            </h2>
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
        return (
          <div></div>
        );
    }
  };

  return (
      <div className="container">
        {renderView(isCompanyValid)}
        {isCompanyValid && <GenericBox box={"job"} company={company} />}
      </div>
  );

};

export default CompanyPage;
