import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  footerRoot: {
    flexGrow: 1
  },

  footer: {
    backgroundColor: "rgb(34, 30, 29)",
    color: "white",
    boxShadow: "none",
    marginTop: 80,
    zIndex: 0
  },

  customizeToolbar: {
    height: 50
  },

  buttons: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    textTransform: 'none',
  }
}));
