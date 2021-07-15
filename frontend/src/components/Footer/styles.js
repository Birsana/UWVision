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
    height: 50,
    [theme.breakpoints.down(820)]: {
      margin: "0 auto",
      padding: 0
    },
  },

  buttons: {
    fontSize: "16px",
    textTransform: 'none',
  }
}));
