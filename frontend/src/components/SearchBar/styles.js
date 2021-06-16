import styled from '@emotion/styled';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Search Bar Component Styles:
// TODO: Responsive Designs for Mobile and Tablet
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
export const SearchBarStyles = {
    control: (base, state) => ({
      ...base,
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: '400',
      backgroundColor: 'rgba(229, 229, 229)',
      cursor: 'text',
      borderRadius: 0,
      border: 0,
    }),
  
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        fontFamily: 'Roboto',
        fontSize: 16,
        cursor: 'pointer',
        backgroundColor: isFocused ? 'rgba(226, 227, 228)' : 'white',
        color: isFocused ? 'black' : 'grey',
        lineHeight: 2,
      }
    },
  
    input: styles => ({
      ...styles,
      fontFamily: 'Roboto',
      color: 'black',
    }),
  
    menu: styles => ({
      ...styles,
      marginTop: 5,
      boxShadow: 'none',
      borderRadius: 0,
    }),
  
    singleValue: styles => ({
      ...styles,
      color: 'black',
    }),

    placeholder: styles => ({
      ...styles,
      color: 'black',
    })
  }
  

// Add search icon to search bar
export const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
           <FontAwesomeIcon icon={faSearch} style={{color: 'rgba(79, 78, 67)'}}/>
        </components.DropdownIndicator>
      )
    )
}