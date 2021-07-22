import React from "react";
import SearchBar from "components/SearchBar/SearchBar";
import AddCompanyButton from "components/AddCompanyButton/AddCompanyButton";
import CompanyMarquee from "components/CompanyMarquee/CompanyMarquee";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import './styles.css';

const Home = () => {
  const isShortScreen = useMediaQuery("(max-height: 620px)");
  const isTablet = useMediaQuery("(max-width: 820px)");
  
  const getNumMarquees = () => {
    if (isTablet) {
      return 3;
    } else if (isShortScreen) {
      return 4;
    } else {
      return 6;
    }
  }

  return (
    <div className="container landing">
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
      <div className="landing-graphics">
        <CompanyMarquee num={getNumMarquees()} />
      </div>
    </div>
  );
};
  
export default Home;
