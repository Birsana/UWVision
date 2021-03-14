import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Select, { components } from 'react-select';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//import axios from 'axios';
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


// Styles for Search Bar:
// TODO: Responsive Designs for Mobile and Tablet
const StyledSearch = styled(Select)`
  margin: 50px;
  width: 700px;

  .select__menu-list::-webkit-scrollbar {
    width: 5px;
    height: 0px;
  }
  .select__menu-list::-webkit-scrollbar-track {   /* Colour of Scroll Button's entire area to scroll up/down in */
    background: #f1f1f1;
  }
  .select__menu-list::-webkit-scrollbar-thumb {   /* Actual Scroll Button's Colour */
    background: #888;
  }
  .select__menu-list::-webkit-scrollbar-thumb:hover {  /* Colour of Scroll Button when you hover your mouse over it*/
    background: #555;
  }
`;

// Styling Key:
// control - styling the search box itself
// option - stying the dropdown menu options
// menu - styling the dropdown menu box
// input - styling what the user types into the search box
// singleValue - applies to the selected option that the user chooses
const searchBarStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Roboto Slab',
    fontSize: 18,
    //border: state.isFocused ? 'solid 1px' : 0,
    //boxShadow: state.isFocused ? 1 : 0,
    cursor: 'text',
    borderRadius: 10,
    border: 'solid 1px',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      fontFamily: 'Roboto Slab',
      fontSize: 16,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'rgba(226, 227, 228)' : 'white',
      color: isFocused ? 'black' : 'grey',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    fontFamily: 'Times New Roman, Times, Serif',
    color: 'black',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 10,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'black',
  }),
}

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
         <FontAwesomeIcon icon={faSearch}/>
      </components.DropdownIndicator>
    )
  )
}


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
    // Most likely going to have to do a history.replace on the router to ensure it goes to the correct URL
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
          styles={searchBarStyles}                // Utilizes custom style given above

          components={{ DropdownIndicator }}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);  
