import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useLocation, NavLink } from "react-router-dom";
import SearchBar from "components/SearchBar/SearchBar";

import { useStyles } from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Modal from 'components/Modals/Modal';

import {connect} from 'react-redux';

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [showLogInModal, setShowLogInModal] = useState(false);

  // Sets logged in state of header component
  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
    setShowLogInModal(false);
  }, [props.isLoggedIn])

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
              onClick={() => props.dispatch({type: "LOGOUT"})}
            >
              Logout
            </Button>
          ) : (
            <Button
              className={styles.buttons}
              color="inherit"
              onClick={() => setShowLogInModal(true)}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>

    {showLogInModal && !loggedIn && <Modal initialModal={"Log In"} onClose={() => setShowLogInModal(false)} /> }
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(Header);
