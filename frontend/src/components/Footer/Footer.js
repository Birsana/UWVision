import { NavLink } from "react-router-dom";

// Material-UI Imports:
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";

// Footer Component
const Footer = () => {
  const styles = useStyles();

  return (
    <div className={styles.footerRoot}>
      <AppBar position="relative" className={styles.footer}>
        <Toolbar className={styles.customizeToolbar}>
          <Button
            className={styles.buttons}
            color="inherit"
            onClick={() => window.scrollTo(0, 0)}
          >
            <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
              Home
            </NavLink>
          </Button>

          <Button
            className={styles.buttons}
            color="inherit"
            onClick={() => window.scrollTo(0, 0)}
          >
            <NavLink
              to="/privacy"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Privacy Policy
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
