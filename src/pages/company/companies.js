import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.css";
import { getAllCompanies } from "backendActions";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// autofilled, use arries (rename arries)
const holder= Array(getAllCompanies.length).fill(<div className="rectangle"></div>)

const CompanyElement = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  margin: 1.5%;
  display: inline-block;
  width: 30%;
  height:100px;
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

    const reduceTextOne = useMediaQuery("(min-width: 924px)");

    const reduceTextTwo = useMediaQuery("(min-width: 705px)");
    const maxTwo = useMediaQuery("(max-width: 923px)");

    const reduceTextThree = useMediaQuery("(min-width: 600px")
    const maxThree = useMediaQuery("(max-width: 704px)");

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
        <div className="page_margins">
        {/* <div style={{display: 'flex', paddingLeft: 50, paddingRight: 50}}> */}
        {companyArr.map((company) => {
            return (
                <CompanyElement 
                onClick={() => {props.history.push(`/company/${company.name}`)}}>

                    <companiesPageLogo>
                        {company.logo !== "" ? <img align="left" src={company.logo} style={{ width: '50px'}}/> : <img align="left" src='https://tapnetwork2030.org/wp-content/themes/airi-child/assets/images/NoImageAvailable.png'  style={{ width: '50px'}} />}
                    </companiesPageLogo>

                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: 'translateY(25%)'}}>


                    {reduceTextOne && (
                        <h55 style={{fontSize: 30}}>
                            {company.name} 
                            <div style={{fontSize: 15}}>
                                <b> Job count:</b>  {company.job_count}
                            </div>
                        </h55>

                    )}
                    {(reduceTextTwo && maxTwo) && (
                        <div style={{transform: 'translateY(25%)'}}>
                            <h55 style={{fontSize: 20}}>
                                {company.name} 
                                <div style={{fontSize: 15}}>
                                    <b> Job count:</b>  {company.job_count}
                                </div>
                            </h55>
                        </div>
                    )}
                    {(reduceTextThree && maxThree) && (
                        <h55 style={{fontSize: 15}}>
                            <div style={{transform: 'translateY(125%)'}}>
                                {company.name} 
                            </div>
                            
                        </h55>
                    )}


                    </div>

    
                </CompanyElement>
            )
        })}
        </div>
        
    )
  }
  
  export default withRouter(Companies);
