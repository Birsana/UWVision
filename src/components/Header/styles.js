import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  landingHeader: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    padding: "4px 20px",
    marginBottom: "40px",
    width: "100%",
    [theme.breakpoints.down(600)]: {
      padding: 8,
    },
    [theme.breakpoints.down(520)]: {
      padding: 4,
    },
  },

  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    padding: "4px 20px",
    marginBottom: "60px",
    width: "100%",
    [theme.breakpoints.down(600)]: {
      padding: 8,
    },
    [theme.breakpoints.down(520)]: {
      padding: 4,
      marginBottom: "40px",
    },
  },

  noShadowHeader: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    zIndex: 1,
    padding: "4px 20px",
    marginBottom: "60px",
    width: "100%",
    [theme.breakpoints.down(600)]: {
      padding: 8,
    },
    [theme.breakpoints.down(520)]: {
      padding: 4,
      marginBottom: "40px",
    },
  },

  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 2,
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    height: 34,
    width: 34,
    borderRadius: "50%",
  },

  title: {
    flex: 1,
    fontSize: "20px",
  },

  allCompaniesButton: {
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",
    marginRight: 8,
    marginLeft: -6,
    padding: "5px 16px",
    borderRadius: 4,
    zIndex: 1,
    [theme.breakpoints.down(620)]: {
      display: "none",
    },
  },

  logInButton: {
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none",
    marginRight: 8,
    marginLeft: -6,
    padding: "5px 16px",
    borderRadius: 4,
    zIndex: 1,
    [theme.breakpoints.down(620)]: {
      display: "none",
    },
  },

  signUpButton: {
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "#2196f3",
    color: "white",
    borderRadius: 4,
    padding: "5px 16px",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
    minWidth: 91,
    zIndex: 1,
    [theme.breakpoints.down(400)]: {
      fontSize: 14,
      minWidth: 52,
      padding: 0,
      borderRadius: 4,
      backgroundColor: "transparent",
      color: "black",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    [theme.breakpoints.down(520)]: {
      marginLeft: 0,
      marginRight: "auto",
    },
  },

  menuItem: {
    fontFamily: "Source Sans Pro",
    fontSize: 16,
    width: 200,
    whiteSpace: "break-spaces",
    // wordBreak: "break-all"
  },
}));
