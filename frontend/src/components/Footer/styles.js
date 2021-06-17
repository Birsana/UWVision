import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  footerRoot: {
    flexGrow: 1,
  },

  footer: {
    backgroundColor: "rgb(34, 30, 29)",
    color: "white",
    boxShadow: "0px 0px 0px 0px",
  },

  customizeToolbar: {
    minHeight: 50
  },

  buttons: {
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 400,
    textTransform: 'none',
  }
}));
