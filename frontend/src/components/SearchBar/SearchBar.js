import React, { useEffect, useState, useRef } from "react";
import { withRouter, useLocation } from "react-router-dom";
import {
  StyledSearch,
  SearchBarStylesHome,
  SearchBarStylesNotHome,
  DropdownIndicator,
  Input,
  MenuList,
} from "./styles";

// Backend Imports:
import { getListOfCompanies } from "backendActions";

// ==============================================================================================================

// Search Bar Component
const SearchBar = (props) => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [companyData, setCompanyData] = useState({});
  const selectRef = useRef();
  const location = useLocation();

  // Populate search bar options when component mounts
  useEffect(() => {
    getListOfCompanies().then((response) => {
      setCompanyData(response.data);
    });
  }, []);

  // Handles user's selection of specific company
  const onChange = (selection) => {
    setValue("");
    setInputValue("");
    selectRef.current.blur();
    // Redirects the router to the selected company's page
    const company = selection.label;
    props.history.push("/company/" + company);
  };

  // Saves user input so leaving searchbar doesn't delete it
  const onInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setInputValue(inputValue);
    }
  };

  // Saves user input so leaving searchbar doesn't delete it
  const onFocus = () => value && selectRef.current.select.inputRef.select();

  // Custom option styling
  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex" }}>
      <div>{label}</div>
      <div style={{ color: "#a6a6a6", marginLeft: 8 }}>{value} jobs</div>
    </div>
  );

  return (
    <StyledSearch
      ref={selectRef}
      onChange={onChange}
      onFocus={onFocus}
      onInputChange={onInputChange}
      inputValue={inputValue}
      value={value}
      menuPortalTarget={document.body} // Fixes zIndex issue
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }} // Fixes zIndex issue
      options={companyData} // Uses the map to display the given options
      formatOptionLabel={formatOptionLabel} // Customize options
      placeholder="Search for a company..."
      styles={
        location.pathname === "/" ? SearchBarStylesHome : SearchBarStylesNotHome
      } // Utilizes custom style given above
      components={{ Input, DropdownIndicator, MenuList }}
      noOptionsMessage={() => <div style={{ fontSize: 16 }}>No companies</div>}
    />
  );
};

export default withRouter(SearchBar);
