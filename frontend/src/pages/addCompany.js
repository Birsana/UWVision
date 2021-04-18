import React from "react";
import axios from 'axios';

const addCompanyPage = (props) => {
  //TODO: Need some verification with backend here if user has been logged in

  // const addCompany = async () => {
  //     let addURL = "http://localhost:5000/:companyname/addjob"; //replace :companyname with the actual company
  //       axios({
  //           method: 'post',
  //           url: addURL,
  //           data: {
  //                   "job":{
  //                     "job_name": "Software Engineer" //replace with desired job
  //                   }
  //                 },
  //           headers: {
  //               "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmVmNzU1YzI2M2NlMmU5ODA3MTczYiIsInVzZXJuYW1lIjoic2Vjb25kIiwiZXhwIjoxNjI0MDU1MTA5LCJpYXQiOjE2MTM2OTA3MDl9.R622UH4VjyF-bR_Has3ajC5fp0S4gIKG9u4OsuKxX5w",
  //               "Content-Type": "application/json",
  //               "X-Requested-With": "XMLHttpRequest"
  //             }
  //       })
  // }

  
  return (
    <div>
      <h1> Add Company </h1> 
    </div>
  );
};

export default addCompanyPage;
