// Miscellaneous Imports:
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

// Component Imports:
import Header from 'components/Header/Header';

// Page Imports:
import LandingPage from 'pages/landing/landing';
import CompanyPage from 'pages/company';
import InvalidPage from 'pages/invalid';

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
        <Header />
        <div className="WaterlooVision">
          <Switch>

            {/* Route to landing (home) page*/}
            <Route exact path="/" component={LandingPage} />

            {/* Route to generic company page template - will populate data based on company*/}
            <Route path="/company/:id" component={CompanyPage} />

            {/* 404 Page (if provided an unknown URL */}
            <Route component={InvalidPage} />

          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
