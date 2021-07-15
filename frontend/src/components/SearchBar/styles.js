import styled from '@emotion/styled';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

// Search Bar Component Styles:
export const StyledSearch = styled(Select)`
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

// Search Bar Behaviour Styles:
// control - styling the search box itself
// option - stying the dropdown menu options
// menu - styling the dropdown menu box
// input - styling what the user types into the search box
// singleValue - applies to the selected option that the user chooses
export const SearchBarStylesHome = {
    control: (base, { isFocused }) => ({
      ...base,
      fontSize: 16,
      fontWeight: '400',
      backgroundColor: isFocused ? "white" : 'rgba(229, 229, 229)',
      cursor: 'text',
      borderRadius: 4,
      width: 540,
      border: isFocused ? "1px solid #2196f3" : "none",
      "@media only screen and (max-width: 720px)": {
          ...base["@media only screen and (max-width: 720px)"],
          width: 400,
      },
      "@media only screen and (max-width: 520px)": {
          ...base["@media only screen and (max-width: 520px)"],
          width: 300,
      },
      "@media only screen and (max-width: 360px)": {
          ...base["@media only screen and (max-width: 360px)"],
          width: 270,
      },
      "@media only screen and (max-width: 320px)": {
        ...base["@media only screen and (max-width: 320px)"],
        fontSize: "14px",
        width: 240,
      },
    }),
  
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        fontSize: 16,
        cursor: 'pointer',
        backgroundColor: isFocused ? 'rgba(226, 227, 228)' : 'white',
        color: isFocused ? 'black' : '#4d4d4d',
        lineHeight: 2,
        "@media only screen and (max-width: 820px)": {
          ...styles["@media only screen and (max-width: 820px)"],
          textAlign: "start"
        },
        "@media only screen and (max-width: 320px)": {
          ...styles["@media only screen and (max-width: 320px)"],
          fontSize: "14px",
        },
      }
    },
  
    input: styles => ({
      ...styles,
      color: 'black'
    }),
  
    menu: styles => ({
      ...styles,
      marginTop: 12,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }),
  
    singleValue: styles => ({
      ...styles,
      color: 'black',
    }),

    placeholder: styles => ({
      ...styles,
      color: 'black',
      "@media only screen and (max-width: 320px)": {
        ...styles["@media only screen and (max-width: 320px)"],
        fontSize: "14px",
      },
    })
  }

// Search Bar Behaviour Styles:
// control - styling the search box itself
// option - stying the dropdown menu options
// menu - styling the dropdown menu box
// input - styling what the user types into the search box
// singleValue - applies to the selected option that the user chooses
export const SearchBarStylesNotHome = {
  control: (base, { isFocused }) => ({
    ...base,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: isFocused ? "white" : '#efefef',
    cursor: 'text',
    borderRadius: 4,
    border: isFocused ? "1px solid #2196f3" : "none",
    width: 400,
    "@media only screen and (max-width: 820px)": {
      ...base["@media only screen and (max-width: 820px)"],
      width: 280,
    },
    "@media only screen and (max-width: 700px)": {
      ...base["@media only screen and (max-width: 700px)"],
      width: 236,
    },
    "@media only screen and (max-width: 600px)": {
      ...base["@media only screen and (max-width: 370px)"],
      width: 220,
    },
    "@media only screen and (max-width: 520px)": {
      ...base["@media only screen and (max-width: 520px)"],
      width: 340,
    },
    "@media only screen and (max-width: 490px)": {
      ...base["@media only screen and (max-width: 490px)"],
      width: 300,
    },
    "@media only screen and (max-width: 450px)": {
      ...base["@media only screen and (max-width: 450px)"],
      width: 250,
    },
    "@media only screen and (max-width: 400px)": {
      ...base["@media only screen and (max-width: 400px)"],
      width: 260,
    },
    "@media only screen and (max-width: 364px)": {
      ...base["@media only screen and (max-width: 364px)"],
      width: 220,
    },
    "@media only screen and (max-width: 320px)": {
      ...base["@media only screen and (max-width: 320px)"],
      width: 200,
      fontSize: "14px",
    },
    "@media only screen and (max-width: 300px)": {
      ...base["@media only screen and (max-width: 320px)"],
      width: 190
    },
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      fontSize: 16,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'rgba(226, 227, 228)' : 'white',
      color: isFocused ? 'black' : '#4d4d4d',
      lineHeight: 2,
      "@media only screen and (max-width: 320px)": {
        ...styles["@media only screen and (max-width: 320px)"],
        fontSize: "14px",
      },
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    "@media only screen and (max-width: 320px)": {
      ...styles["@media only screen and (max-width: 320px)"],
      fontSize: "14px",
    },
  }),

  menu: styles => ({
    ...styles,
    marginTop: 8,
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }),

  singleValue: styles => ({
    ...styles,
    color: 'black',
  }),

  placeholder: styles => ({
    ...styles,
    color: '#9e9ea7',
    "@media only screen and (max-width: 320px)": {
      ...styles["@media only screen and (max-width: 320px)"],
      fontSize: "14px",
    },
  })
}
  

// Add search icon to search bar
export const DropdownIndicator = props => {
    const location = useLocation();

    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FontAwesomeIcon icon={faSearch} style={ (location.pathname === "/") ? { color: 'rgba(79, 78, 67)' } : { color: '#9e9ea7' } }/>
        </components.DropdownIndicator>
      )
    )
}