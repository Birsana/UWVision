// Miscellaneous Imports:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { use100vh } from "react-div-100vh";
import "index.css";

// Component Imports:
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

// Page Imports:
import LandingPage from "pages/landing/landing";
import CompanyPage from "pages/company/company";
import JobPage from "pages/job/job";
import InvalidPage from "pages/invalid/invalid";
import PrivacyPolicyPage from "pages/privacyPolicy/privacyPolicy";
import AccountPage from "pages/account/accountPage";
import ForgotPasswordPage from "pages/forgotPassword";

// Handling Redux:
import { createStore } from "redux";
import { Provider } from "react-redux";

// Modal:
import { ModalText, ModalWrapper, Background } from "components/Modals/styles";
import { BiError } from "react-icons/bi";

const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem("username", action.userInfo.username);
    localStorage.setItem("email", action.userInfo.email);
    localStorage.setItem("token", action.userInfo.token);
  } else if (action.type === "LOGOUT") {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }

  // Returning current log-in state
  state = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") !== null,
  };

  return state;
};

const reduxStore = createStore(reducer);

// =============================================================================================

// Automatically scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App
const App = () => {
  const height = use100vh();

  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <CssBaseline />
        <ScrollToTop />
        <div>
          <div style={{ minHeight: height - 80 }}>
            <Header />
            <Background>
              <ModalWrapper>
                <BiError style={{ margin: "auto", marginBottom: -10, marginTop: 12 }} size={48} />
                <ModalText style={{ textAlign: "center", fontSize: 18 }}><b>UWVision</b> is currently under maintenance. Please check back later!</ModalText>
              </ModalWrapper>
            </Background>
            <Switch>
              {/* Landing page (a.k.a. home) */}
              <Route exact path="/" component={LandingPage} />

              {/* Generic company page template - will populate data based on company */}
              <Route exact path="/company/:id" component={CompanyPage} />

              {/* Generic job page template - will populate data based on job */}
              <Route exact path="/company/:id/job/:jobId" component={JobPage} />

              {/* Privacy policy page */}
              <Route exact path="/privacy" component={PrivacyPolicyPage} />

              {/* Account page */}
              <Route exact path="/account" component={AccountPage} />

              {/* Reset password page */}
              <Route
                exact
                path="/forgotPassword/:resetToken"
                component={ForgotPasswordPage}
              />

              {/* 404 Page (if provided a URL that doesn't match the ones above) */}
              <Route component={InvalidPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
