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
    fontFamily: "Roboto Slab",
  },

  buttons: {
    fontFamily: "Roboto Slab",
  },

  searchBar: {
    marginLeft: "30px",
    marginRight: "25px",
    width: "300px",
  },
}));
