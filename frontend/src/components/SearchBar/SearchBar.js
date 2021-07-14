import React, {useEffect, useState} from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import {
  StyledSearch,
  SearchBarStylesHome,
  SearchBarStylesNotHome,
  DropdownIndicator
} from './styles';

// Backend Imports:
import { getListOfCompanies } from 'backendActions';

// ==============================================================================================================

// Search Bar Component
const SearchBar = (props) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState({});
  const location = useLocation();

  // Populate search bar options when component mounts
  useEffect(() => {
    getListOfCompanies().then(response => {
      setCompanyData(response.data);
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
        placeholder="Search for a company..."
        openMenuOnClick={false} // Prevents option to reveal all options when user clicks the search bar
        className="select" // Since it is part of the "Select" component
        styles={(location.pathname === "/") ? SearchBarStylesHome : SearchBarStylesNotHome} // Utilizes custom style given above
        components={{ DropdownIndicator }}
        //TODO: noOptionsMessage={() => "This company does not currently exist in the database"}
      />
  );
};

export default withRouter(SearchBar);  
