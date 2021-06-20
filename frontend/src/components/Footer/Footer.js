import { withRouter, } from "react-router-dom";

// Material-UI Imports:
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";

// Footer Component
const Footer = (props) => {
  const styles = useStyles();

  const handleClick = (clickLocation) => {
    let destination = "";
    if (clickLocation === "privacy") {
      destination = "/privacy";
    } else if (clickLocation === "home") {
      destination = "/";
    }

    props.history.push(destination);
    window.scrollTo(0, 0);
  }

  return (
    <div className={styles.footerRoot}>
      <AppBar position="relative" className={styles.footer}>
        <Toolbar className={styles.customizeToolbar}>
          <Button
            className={styles.buttons}
            color="inherit"
            onClick={() => handleClick("home")}
          >
            Home
          </Button>

          <Button
            className={styles.buttons}
            color="inherit"
            onClick={() => handleClick("privacy")}
          >
            Privacy Policy
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Footer);
