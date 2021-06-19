import React, { useEffect, useState } from "react";
import { useLocation, NavLink, withRouter } from "react-router-dom";

// Material-UI Imports:
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles } from "./styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
// import AccountCircle from "@material-ui/icons/AccountCircle";

// Component Imports:
import SearchBar from "components/SearchBar/SearchBar";
import Modal from "components/Modals/Modal";

// Redux Imports:
import { connect } from "react-redux";

// ==============================================================================================================

// Header Component:
const Header = (props) => {
  // States controlled by redux:
  const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);

  // Header States:
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Account Menu States
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            {/* Render the UWVision typography if viewport size is greater than 650px or if on homepage*/}
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
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  style={{ padding: 0 }}
                >
                  {/* <AccountCircle /> */}
                  <div className={styles.profile}>
                    {localStorage.getItem('username').substr(0, 1)}
                  </div>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  disableScrollLock={true}
                  onClose={handleMenuClose}
                  style={{ marginTop: 10 }}
                >
                  <MenuItem
                    className={styles.menuItem}
                    onClick={() => {
                      props.history.push("/account");
                      handleMenuClose();
                    }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    className={styles.menuItem}
                    onClick={() => {
                      props.dispatch({ type: "LOGOUT" });
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
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
          onClose={() => {
            setShowLogInModal(false);
          }}
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

export default connect(mapStateToProps)(withRouter(Header));
