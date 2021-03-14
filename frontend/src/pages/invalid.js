import React from "react";
import { Redirect } from 'react-router-dom';

// Formatting/styles need to be updated (this is a placeholder)
const invalidPage = () => {
  function redirectButton() {
    // Redirect back to homepage
    <Redirect to="/" />;
  }

  return (
    <div>
      <h1>404</h1> 
      <p> The page you are requesting for does not exist. </p>
      <p> Do you wish to redirect to the WaterlooVision homepage?</p>
      <button onClick={redirectButton}>
        Redirect to Homepage
      </button>
    </div>
  );
};

export default invalidPage;