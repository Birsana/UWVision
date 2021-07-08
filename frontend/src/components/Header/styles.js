import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
    padding: "10px 20px",
    marginBottom: "40px",
    [theme.breakpoints.down(520)]: {
      padding: "10px 0px",
      display: "flex",
      alignItems: "center",
      width: "auto"
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
    borderRadius: 10,
    [theme.breakpoints.down(620)]: {
      display: "none"
    }
  },

  signUpButton: {
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: "6px 16px",
    '&:hover': {
      backgroundColor: '#535353'
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
    width: "400px",
    [theme.breakpoints.down(520)]: {
      marginLeft: 0,
      marginRight: 10
    }
  },

  menuItem: {
  }
}));
