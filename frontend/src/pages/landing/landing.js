import React from "react";
import SearchBar from "components/SearchBar/SearchBar";
import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";

import landingPageImage from 'assets/landingPageImageDark.png';
import './styles.css';

//TODO: Responsive design

const Home = () => {
  return (
    <>
      <div className="landing">
        <div className="landing-container">
          <h1 className="landing-header">Get the inside scoop on co-op jobs</h1>
          <h2 className="landing-subheader">Salary Insights | Interview Questions | Uncensored Reviews</h2>

          <div className="searchbar-container">
            <div className="searchbar">
              <SearchBar />
            </div>
            <AddCompanyButton company='a company' />
          </div>

        </div>
      </div>
      <img src={landingPageImage} className="landingImage" alt=""/>
    </>
  );
};
  
export default Home;
