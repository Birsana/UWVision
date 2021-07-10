import { getSavedJobs } from "backendActions"
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import styled from "styled-components";
import Job from "components/CompanyPageComponents/Job";

const SavedJobsList = styled.div`
    width: -webkit-calc(100%);
    max-width: 1000px;
    margin-left: 200px;

    h1 {
        font-size: 30px;
        font-weight: 300;
    }

    h2 {
        margin-bottom: 12px;
        font-weight: bold;
        
    }
`;

const SavedJobs = (props) => {
    const [savedJobs, setSavedJobs] = useState({});
    
    useEffect(() => {
        let isMounted = true;  
        getSavedJobs(props.token).then(response => {
            if (isMounted) {
                const finalData = {};
        
                response.data.forEach(element => {
                    if (!finalData[element.company]) {
                        finalData[element.company] = [];
                    }
                    finalData[element.company].push(element);
                });
        
                setSavedJobs(finalData)
            }
        });
        return () => { isMounted = false };
    }, [savedJobs, props.token]); //! Empty dependency array is important as we only want to call this useEffect once

    return (
      <SavedJobsList>
        {Object.keys(savedJobs).length !== 0 ? <h1>Here are your saved jobs:</h1> : <h1>You have no saved jobs currently.</h1>}
        <br></br>
        <br></br>
        {Object.keys(savedJobs).map((companyName) => {
          return (
            <div key={companyName}>
              <h2>{companyName}</h2>
              {savedJobs[companyName].map((job) => {
                return <Job key={`${companyName}-${job.id}`} jobData={job} accountPage={true}/>;
              })}
              <br></br>
            </div>
          );
        })}
      </SavedJobsList>
    );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
export default connect(mapStateToProps)(SavedJobs);
