import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  headerRoot: {
    flexGrow: 1
  },

  header: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0px 0px 0px 0px",
    paddingTop: "20px"
  },

  title: {
    flexGrow: 1,
    fontFamily: "Roboto Mono",
    fontSize: "28px",
    marginLeft: "40px"
  },

  logInButton: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 400,
    textTransform: 'none',
    marginRight: "20px"
  },

  signUpButton: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: "bold",
    textTransform: 'none',
    marginRight: "40px",

    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "3px",
    paddingBottom: "3px",
    '&:hover': {
      backgroundColor: '#535353'
    }
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    width: "500px"
  },
}));
