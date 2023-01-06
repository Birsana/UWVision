import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.css";
import { getAllCompanies } from "backendActions";
import styled from "styled-components";

// autofilled, use arries (rename arries)
const holder= Array(getAllCompanies.length).fill(<div className="rectangle"></div>)

const CompanyElement = styled.div`
  text-align: center;
  background-color: #f5f5f5;
  display: inline-block;
  width: 25%;
  height: 100px;
  margin: 1.5%;
  padding-right: 10px;
  box-shadow: 2px 2px 7px lightgray;
  @media (hover: hover) and (pointer: fine),
    only screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) {
    &:hover {
      background-color: #ececec;
      cursor: pointer;
    }
  }
`;

const Companies = (props) => {
    const [companyArr, setCompanyArr] = useState([]) // stores array of company info
    // const holder= Array(companyArr.length).fill(<div className="rectangle"></div>)

    // Fetches the list of companies and stores it in companyArr
    useEffect(() => {
        getAllCompanies()
            .then((response) => {
                setCompanyArr(response.data)
            })
    }, [])

    return (
        <m>
        {companyArr.map((company) => {
            return (
                <CompanyElement 
                onClick={() => {props.history.push(`/company/${company.name}`)}}>

                    <a>
                        {company.logo !== "" ? <img align="left" src={company.logo} style={{ width: '50px'}}/> : <img align="left" src='https://tapnetwork2030.org/wp-content/themes/airi-child/assets/images/NoImageAvailable.png'  style={{ width: '50px'}} />}
                    </a>

                    <h55>
                        {company.name} 
                    </h55>
                    <br />
                    <h56>
                      <b> Job count:</b>  {company.job_count}
                    </h56>
    
                </CompanyElement>
            )
        })}
        </m>

        // 
        //<div className="page_margins">
        //</div>
        //array_of_companies
    )
  }
  
  export default withRouter(Companies);
