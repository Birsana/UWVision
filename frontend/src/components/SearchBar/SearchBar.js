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
  const [input, setInput] = useState(false);
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
    setSelectedCompany(selection.label);

    // Redirects the router to the selected company's page
    const company = selection.label;
    props.history.push("/company/" + company);
  };

  // Make sure no options are shown if input is empty
  const handleInputChange = (input) => {
    if (input.length === 0) {
      setInput(false)
    } else {
      setInput(true)
    }
  };

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{label}</div>
      <div style={{ color: "#a6a6a6" }}>
        {value} jobs
      </div>
    </div>
  );

  return (
      <StyledSearch
        value={selectedCompany} // Allows for selected option to appear in search bar, after clicking it
        options={input ? companyData.slice(0, 6) : []} // Uses the map to display the given options
        formatOptionLabel={formatOptionLabel} // Customize options
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search for a company..."
        openMenuOnClick={false} // Prevents option to reveal all options when user clicks the search bar
        className="select" // Since it is part of the "Select" component
        styles={(location.pathname === "/") ? SearchBarStylesHome : SearchBarStylesNotHome} // Utilizes custom style given above
        components={{ DropdownIndicator }}
        noOptionsMessage={() => <div style={{ fontSize: 16 }}>No companies</div>}
      />
  );
};

export default withRouter(SearchBar);  
