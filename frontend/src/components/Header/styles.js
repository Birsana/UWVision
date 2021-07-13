import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  landingHeader: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    padding: "4px 20px",
    marginBottom: "40px",
    width: "100%"
  },

  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    padding: "4px 20px",
    marginBottom: "60px",
    width: "100%",
    [theme.breakpoints.down(520)]: {
      padding: "4px 0px",
      display: "flex",
      width: "auto",
      marginBottom: "40px"
    }
  },

  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    height: 34,
    width: 34,
    borderRadius: "50%"
  },

  title: {
    flex: 1,
    fontSize: "20px"
  },

  logInButton: {
    fontSize: "16px",
    fontWeight: 400,
    textTransform: 'none',
    marginRight: 8,
    marginLeft: -6,
    padding: "6px 16px",
    borderRadius: 4,
    [theme.breakpoints.down(620)]: {
      display: "none"
    }
  },

  signUpButton: {
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "#2196f3",
    color: "white",
    borderRadius: 4,
    padding: "6px 16px",
    '&:hover': {
      backgroundColor: '#1976d2'
    },
    minWidth: 91,
    [theme.breakpoints.down(400)]: {
      fontSize: 14,
      minWidth: 52,
      padding: 0,
      borderRadius: 4,
      backgroundColor: "transparent",
      color: "black",
      '&:hover': {
        backgroundColor: 'transparent'
      },
    }
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    [theme.breakpoints.down(520)]: {
      marginLeft: 0,
      marginRight: "auto"
    }
  },

  menuItem: {
  }
}));
