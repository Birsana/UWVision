import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import {
  StyledSearch,
  SearchBarStyles,
  DropdownIndicator
} from './styles';

// Backend Imports:
import { getListOfCompanies } from 'backendActions';

// ==============================================================================================================

// Search Bar Component
const SearchBar = (props) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState({});

  // Populate search bar options when component mounts
  useEffect(() => {
    getListOfCompanies().then(companyList => {
      const listOfCompanies = [];
      
      companyList.forEach(company => {
        listOfCompanies.push({label: company, value: company});
      });

      setCompanyData(listOfCompanies);
    });
  }, []);

  // Handles user's selection of specific company
  const handleChange = (selection) => {
    setSelectedCompany(selection.value);

    // Redirects the router to the selected company's page
    const company = selection.value;
    props.history.push("/company/" + company);
  };

  return (
      <StyledSearch
        value={selectedCompany} // Allows for selected option to appear in search bar, after clicking it
        options={companyData} // Uses the map to display the given options
        onChange={handleChange}
        placeholder="Search for a company"
        openMenuOnClick={false} // Prevents option to reveal all options when user clicks the search bar
        classNamePrefix="select" // Since it is part of the "Select" component
        styles={SearchBarStyles} // Utilizes custom style given above
        components={{ DropdownIndicator }}
        //TODO: noOptionsMessage={() => "This company does not currently exist in the database"}
      />
  );
};

export default withRouter(SearchBar);  
