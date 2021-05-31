import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  header: {
    backgroundColor: "black",
    color: "white",
    boxShadow: "0px 0px 0px 0px"
  },

  title: {
    flexGrow: 1,
    fontFamily: "Roboto Mono",
    fontSize: "30px",
    marginLeft: "75px"
  },

  buttons: {
    fontFamily: "Roboto Mono",
    fontSize: "16px",
    fontWeight: 400,
    textTransform: 'none',
    marginRight: "75px"
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    width: "400px",
  },
}));
