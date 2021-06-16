import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

// Material-UI Imports:
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles } from "./styles";

// Component Imports:
import SearchBar from "components/SearchBar/SearchBar";
import Modal from "components/Modals/Modal";

// Redux Imports:
import { connect } from "react-redux";
import { signUp } from "backendActions";

// ==============================================================================================================

// Header Component:
const Header = (props) => {
  // States controlled by redux:
  const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);

  // Header States:
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Sets logged in state of header component (will update automatically based on Redux state)
  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
    setShowLogInModal(false);
    setShowSignUpModal(false);
  }, [props.isLoggedIn]);

  // Material-UI Specific Styling Stuff:
  const styles = useStyles();
  const displayTypography = useMediaQuery("(min-width: 523px)");

  // Used to determine whether searchbar should be in header or not:
  const location = useLocation();

  return (
    <>
      <div className={styles.headerRoot}>
        <AppBar position="static" className={styles.header}>
          <Toolbar>
            {/* Render the WaterlooVision typography if viewport size is greater than 650px or if on homepage*/}
            {(displayTypography || location.pathname === "/") && (
              <Typography variant="h5" className={styles.title}>
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  UW<b>Vision</b>
                </NavLink>
              </Typography>
            )}

            {/* Render the search bar if not on the home page */}
            {location.pathname !== "/" && (
              <div className={styles.searchBar}>
                <SearchBar />
              </div>
            )}

            {loggedIn ? (
              <Button
                className={styles.logInButton}
                color="inherit"
                onClick={() => props.dispatch({ type: "LOGOUT" })}
              >
                Logout
              </Button>
            ) : (
              <>
              <Button
                className={styles.logInButton}
                color="inherit"
                onClick={() => setShowLogInModal(true)}
              >
                Login
              </Button>
              <Button
                className={styles.signUpButton}
                color="inherit"
                onClick={() => setShowSignUpModal(true)}
              >
                Sign Up
              </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>

      {showLogInModal && !loggedIn && (
        <Modal
          initialModal={"Log In"}
          onClose={() => {setShowLogInModal(false)}}
        />
      )}

      {showSignUpModal && !loggedIn && (
        <Modal
        initialModal={"Sign Up"}
        onClose={() => setShowSignUpModal(false)}
      />
      )}
    </>
  );
};

// Injecting redux logged-in states into props for header
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(Header);
