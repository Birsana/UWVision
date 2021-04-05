import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import {
  StyledSearch,
  SearchBarStyles,
  DropdownIndicator
} from './styles';

const SearchBar = (props) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    getCompanyData();
  }, []);

  const getCompanyData = async () => {
    //TODO: Export backend route variables into a standalone constants file and call from there
    const companyDataURL = "http://localhost:5000/data/companyData";

    // TODO: Error handling for get request
    const response = (await axios.get(companyDataURL)).data;

    const listOfCompanies = response.map(
      ({company_name}) => {
        return {
          label: company_name,
          value: company_name
        }
      }
    );

    setCompanyData(listOfCompanies);
  };

  const handleChange = (selection) => {
    setSelectedCompany(selection.label);

    // Redirects the router to the selected company's page
    const company = selection.label;
    props.history.push("/company/" + company);

    //TODO: Will need the search bar present even on company pages in case users want to search for another company
  };

  return (
    <div>
      <StyledSearch
        value={selectedCompany} // Allows for selected option to appear in search bar, after clicking it
        options={companyData} // Uses the map to display the given options
        onChange={handleChange}
        placeholder="Search for a company..."
        openMenuOnClick={false} // Prevents option to reveal all options when user clicks the search bar
        classNamePrefix="select" // Since it is part of the "Select" component
        styles={SearchBarStyles} // Utilizes custom style given above
        components={{ DropdownIndicator }}
      />
    </div>
  );
};

export default withRouter(SearchBar);  
