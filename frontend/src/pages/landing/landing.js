import React from "react";
import SearchBar from "components/SearchBar/SearchBar";
import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";
import ThreadBox from "components/JobComponents/ThreadsComponents/ThreadBox";

import landingPageCopy from './copy';
import './styles.css';

//TODO: Responsive design

const Home = () => {
  return (
    <div className="landing">
      <h1>{landingPageCopy.h1Text}</h1>
      <h2>{landingPageCopy.h2Text}</h2>
      
      <div style={{display: "flex"}}>
        <div className="searchbar">
        <SearchBar />
        </div>
      <AddCompanyButton />
      </div>

      <h3>{landingPageCopy.keywordsText}</h3>
    </div>
  );
};


  
  


export default Home;
