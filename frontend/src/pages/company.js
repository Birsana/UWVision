import React from "react";

const companyPage = (props) => {
  const company = props.match.params.id;

  //TODO: Need some verification with backend here 
  // If the given company does not exist in the database, we give the user a prompt
  // that the company does not currently exist: would they like to add it to our database
  
  return (
    <div>
      <h1> {company} </h1> 
    </div>
  );
};

export default companyPage;
