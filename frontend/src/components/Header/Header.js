import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useLocation, NavLink } from "react-router-dom";
import SearchBar from "components/SearchBar/SearchBar";

import { useStyles } from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Modal from 'components/Modals/Modal';

const Header = (props) => {
  //TODO: Connect to redux to pull logged-in state
  const [loggedIn, setLoggedIn] = useState(false);

  const [showLogInModal, setShowLogInModal] = useState(false);

  const logInAction = () => {
    //TODO: Log-in modal (with signup)
    setShowLogInModal(true);
    setLoggedIn(true);
  };

  const logOutAction = () => {
    //TODO: Handle log-out action + send to Redux
    setLoggedIn(false);
  };

  const styles = useStyles();
  const location = useLocation();
  const displayTypography = useMediaQuery("(min-width: 523px)");

  return (
    <>
    <div className={styles.root}>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          {/* Render the WaterlooVision typography if viewport size is greater than 650px or if on homepage*/}
          {(displayTypography || location.pathname === "/") && (
              <Typography variant="h5" className={styles.title}>
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "unset" }}
                >
                  WaterlooVision
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
              className={styles.buttons}
              color="inherit"
              onClick={logOutAction}
            >
              Logout
            </Button>
          ) : (
            <Button
              className={styles.buttons}
              color="inherit"
              onClick={logInAction}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>

    {showLogInModal && <Modal initialModal={"Log In"} onClose={() => setShowLogInModal(false)} /> }
    </>
  );
};

export default Header;
