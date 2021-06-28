// Miscellaneous Imports:
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'index.css';

// Component Imports:
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

// Page Imports:
import LandingPage from 'pages/landing/landing';
import CompanyPage from 'pages/company/company';
import JobPage from 'pages/job/job';
import InvalidPage from 'pages/invalid';
import PrivacyPolicyPage from 'pages/privacyPolicy/privacyPolicy';
import AccountPage from 'pages/account/accountPage';
import TestingPage from 'pages/testingPage'; //TODO: REMOVE THIS LATER

// Handling Redux:
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem('username', action.userInfo.username)
    localStorage.setItem('email', action.userInfo.email)
    localStorage.setItem('token', action.userInfo.token)
  } else if (action.type === "LOGOUT") {
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
  }

  // Returning current log-in state
  state = {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    isLoggedIn: (localStorage.getItem('token') !== null)
  }

  return state;
}

const reduxStore = createStore(reducer);

// =============================================================================================

// Main App
const App = () => {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <CssBaseline />
        <div>
          <div className="UWVision">
            <Header />
            <Switch>

              {/* Route to landing (home) page*/}
              <Route exact path="/" component={LandingPage} />

              {/* Route to generic job page template - will populate data based on job*/}
              <Route path="/company/:id/job/:jobId" component={JobPage} />

              {/* Route to generic company page template - will populate data based on company*/}
              <Route path="/company/:id" component={CompanyPage} />

              <Route path="/test" component={TestingPage} />

              <Route exact path="/privacy" component={PrivacyPolicyPage} />

              <Route exact path="/account" component={AccountPage} />

              {/* 404 Page (if provided an unknown URL */}
              <Route component={InvalidPage} />

            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
