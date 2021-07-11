import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { HiOutlineEmojiSad } from "react-icons/hi";

import { getCompanyJobData } from "backendActions";
import JobList from "./JobList";

import Loader from "react-loader-spinner";

const JobScrollableDiv = styled.div`
  margin: auto;
  margin-top: 40px;
  width: 100%;
`;

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

const JobBox = (props) => {
  const company = props.company;
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompanyJobData(
      company,
      props.isLoggedIn ? `Token ${props.token}` : ""
    ).then((response) => {
      setData(response.data);
    });
  }, [company, props.isLoggedIn, props.token]);

  const BoxToRender = () => {
    // Loading Animation
    if (!data) {
      return (
        <NoJobDataDiv>
          <Loader type="Oval" color="#2196f3" height={80} width={80} />
        </NoJobDataDiv>
      );
    }

    if (data && data.length === 0) {
      return (
        <NoJobDataDiv>
          {company} has no reviews yet!
          <HiOutlineEmojiSad
            style={{ marginTop: 10 }}
            size={96}
            color="rgba(0, 0, 0, 0.1)"
          />
        </NoJobDataDiv>
      );
    }

    return (
      <JobScrollableDiv>
        <JobList data={data} />
      </JobScrollableDiv>
    );
  };

  return (
    <div>
      <BoxToRender />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(JobBox);
