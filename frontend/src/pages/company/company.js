import React, { useEffect, useState } from "react";
import axios from 'axios';

import AddCompanyButton from 'components/AddCompanyButton/AddCompanyButton';
import './styles.css';

const CompanyPage = (props) => {
  const company = props.match.params.id;
  const [companyData, setCompanyData] = useState({})
  const [isCompanyValid, setIsCompanyValid] = useState(null);

  useEffect(() => {
    const request = `http://localhost:5000/data/findCompanyData/${company}`;
    axios.get(request)
      .then((response) => {
        setCompanyData(response.data)
        setIsCompanyValid(true);
      })
      .catch((error) => {
        setIsCompanyValid(false);
      })
  }, [company]);
 
  const renderView = (doesCompanyExist) => {
    //TODO: Refactor all the returns to use sub-components
    switch (doesCompanyExist) {
      case true:
        return (
          <div>
            <h1>{company}</h1>
          </div>
        );

      case false:
        return (
          <div>
            <h1>The requested company "{company}" does not exist</h1>
            <p>Would you like to add it to the database?</p>
            <AddCompanyButton />
          </div>
        );

      default:
        return (
          <div>
            <p> Loading... </p>
          </div>
        );
    }
  };

  return renderView(isCompanyValid);
};

export default CompanyPage;
