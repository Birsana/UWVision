import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from 'components/Header/Header';

// Page Imports:
import LandingPage from 'pages/landing/landing';
import CompanyPage from 'pages/company';
import InvalidPage from 'pages/invalid';
import LogInPage from 'pages/login';

// === Handling Redux ===
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

function App() {
  return (
    <Provider store={reduxStore}>
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

            {/* Log-In Page */}
            <Route path="/login" component={LogInPage} />

            {/* 404 Page (if provided an unknown URL */}
            <Route component={InvalidPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
