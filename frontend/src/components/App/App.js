import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from 'components/Header/Header';

// Page Imports:
import LandingPage from 'pages/landing/landing';
import CompanyPage from 'pages/company';
import InvalidPage from 'pages/invalid';
import AddCompanyPage from 'pages/addCompany';
import LogInPage from 'pages/login';

function App() {
  return (
    <BrowserRouter>
    <CssBaseline />
    <Header />
      <div className="WaterlooVision">
        <Switch>
          {/* Route to home page*/}
          <Route exact path="/" component={LandingPage} />

          {/* If user enters company URL with no given company, redirect to home page*/}
          <Redirect from="/company" to="/" exact />

          {/* Route to generic company page template - will populate data based on company*/}
          <Route path="/company/:id" component={CompanyPage} />

          {/* Add Company Page */}
          <Route path="/addCompany" component={AddCompanyPage} />

          {/* Log-In Page */}
          <Route path="/login" component={LogInPage} />

          {/* 404 Page (if provided an unknown URL */}     
          <Route component={InvalidPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
