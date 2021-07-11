import { getSavedJobs } from "backendActions"
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import styled from "styled-components";
import Job from "components/CompanyPageComponents/Job";
import { HiOutlineEmojiSad } from "react-icons/hi";

const SavedJobsList = styled.div`
  h1 {
    font-size: 40px;
    margin: 0;
    margin-bottom: 20px;
  }

  @media (max-width: 1055px) {
    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 820px) {
    h1 {
      font-size: 28px;
    }
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 24px;
    }
  }
`;

const JobContainer = styled.div`
  margin-bottom: 40px;
`

const NoJobDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  color: rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 32px;
  margin-top: 40px;
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
        <h1>Saved jobs</h1>
        {Object.keys(savedJobs).length === 0 ? 
          <NoJobDataDiv>
            No saved jobs!
            <HiOutlineEmojiSad style={{ marginTop: 10 }} size={96} color="rgba(0, 0, 0, 0.1)" />
          </NoJobDataDiv>
        :
          Object.keys(savedJobs).map((companyName) => {
            return (
              <JobContainer key={companyName}>
                <h2 style={{ color: "#828282" }}>{companyName}</h2>
                {savedJobs[companyName].map((job) => {
                  return <Job key={`${companyName}-${job.id}`} jobData={job} accountPage={true}/>;
                })}
              </JobContainer>
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
