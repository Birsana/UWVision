import React, { useState, useEffect } from "react";
import axios from "axios";
import GenericList from "components/GenericComponents/GenericList";
import styled from "styled-components";
import { connect } from "react-redux";

//TODO: Fix weird scaling behaviour for width + max-height (responsive)
const JobScrollableDiv = styled.div`
  margin-left: 100px;
  margin-top: 40px;
  width: -webkit-calc(100% - 210px);
  max-height: 65vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const JobListDiv = styled.div`
  margin-bottom: -25px;
`;

const NoJobDataDiv = styled.div`
  margin-left: 100px;
  margin-top: 40px;

  h2 {
    margin-bottom: -10px;
  }
`;

//TODO: modify data that is being called based on which box it is

function GenericBox(props) {
  const company = props.company;
  const [data, setData] = useState(null);

  useEffect(() => {
    var dataArr = [];

    var url = `http://localhost:5000/data/getcompanydata/${company}`;

    async function fetchData() {
      await axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": (props.isLoggedIn ? `Token ${props.token}` : "")
          },
        })
        .then((response) => {
          let data = response.data;
          data.forEach((thread) => {
            dataArr.push(thread);
          });
          setData({
            dataArr: dataArr,
            type: props.box,
          });
        });
    }
    fetchData();
  }, [company]);

  const BoxToRender = () => {
      if (!data || data.dataArr.length === 0) {
        return (
          <NoJobDataDiv>
            <h2>There are currently no jobs listed for this company :(</h2>
            <h2>You can be the first to add one!</h2>
          </NoJobDataDiv>
        );
      }
    
    return (
      <JobScrollableDiv>
        <JobListDiv>
          <GenericList data={data} />
        </JobListDiv>
      </JobScrollableDiv>
    );
  };

  return (
    <div>
      <BoxToRender />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(GenericBox);
