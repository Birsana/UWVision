import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
    padding: "10px 20px",
    marginBottom: "40px"
  },

  title: {
    flex: 1,
    fontSize: "20px"
  },

  logInButton: {
    fontSize: "16px",
    fontWeight: 400,
    textTransform: 'none',
    marginRight: "10px"
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
    }
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    width: "400px"
  },

  menuItem: {
  }
}));
