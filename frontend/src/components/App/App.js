import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Page Imports:
import HomePage from 'pages/home';
import CompanyPage from 'pages/company';
import InvalidPage from 'pages/invalid';

function App() {
  return (
    <BrowserRouter>
      <div className="WaterlooVision">
        <Switch>

          {/* Route to home page*/}
          <Route exact path="/" component ={HomePage} />

          {/* If user enters company URL with no given company, redirect to home page*/}
          <Redirect from="/company" to="/" exact />

          {/* Route to generic company page template - will populate data based on company*/}
          <Route path="/company/:id" component={CompanyPage} />

          {/* 404 Page (if provided an unknown URL */}     
          <Route component={InvalidPage} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
