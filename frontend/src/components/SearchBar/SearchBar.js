import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//import axios from 'axios';

import {
  StyledSearch,
  SearchBarStyles,
  DropdownIndicator
} from './styles';

import companyData from './junkSearch.json';


//GET COMPANY DATA FOR SEARCH BAR
// async function getData(){
//     try {
//       const responseData = await axios.get('http://localhost:5000/data/companyData');
//       console.log(responseData);  
//     }
//     catch (error) {
//       console.log('error: ' + error);
//     }
//   }

// Maps placeholder data for companies currently
const companyMap = companyData.map(
    ({company_name}) => {
        return {
            label: company_name,
            value: company_name
        }
    }
);

// Search Bar Component
class SearchBar extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });

    // Redirects the router to the selected company's page
    const company = selectedOption.label;
    this.props.history.push("/company/" + company);

    //TODO: (Will need the search bar present even on company pages in case users want to search for another company)
  };

  render() {
    return (
      <div>
        <StyledSearch
          value={this.state.selectedOption}       // Allows for selected option to appear in search bar, after clicking it
          options={companyMap}                    // Uses the map to display the given options
          onChange={this.handleChange}  
          placeholder="Search for a company..."   
          openMenuOnClick={false}                 // Prevents option to reveal all options when user clicks the search bar
          classNamePrefix="select"                // Since it is part of the "Select" component
          styles={SearchBarStyles}                // Utilizes custom style given above
          components={{ DropdownIndicator }}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);  
