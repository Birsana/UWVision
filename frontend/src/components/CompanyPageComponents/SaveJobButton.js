import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { connect } from "react-redux";
import Modal from "components/Modals/Modal";
import { saveJobToUser } from "backendActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  saveButton: {
    textTransform: "none",
    fontSize: "16px",
    [theme.breakpoints.down(520)]: {
      fontSize: "14px",
    },
  },
}));

const SaveJobButton = (props) => {
  const [isSaved, setIsSaved] = useState(props.accountPage || props.isSaved);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 520px)");

  useEffect(() => {
    if (props.isLoggedIn) {
      setShowLogInModal(false);
    }
  }, [props.isLoggedIn]);

  const styles = useStyles();

  const onClick = (event) => {
    event.stopPropagation();

    if (props.isLoggedIn) {
      setIsSaved(!isSaved);
      saveJobToUser(props.companyName, props.jobName, props.token); // Backend call
      //! May need to set a rate limit for this
    } else {
      setShowLogInModal(true);
    }
  };

  return (
    <>
      <Button
        onClick={onClick}
        style={
          isSaved
            ? {
                color: "#2196f3",
                fontWeight: 600,
                margin: isMobile ? "4px 0 0 -6px" : "-2px -4px 0 0",
              }
            : {
                color: "#939393",
                fontWeight: 600,
                margin: isMobile ? "4px 0 0 -6px" : "-2px -4px 0 0",
              }
        }
        className={styles.buttonStyleSaved}
      >
        {isSaved ? (
          <>
            <RiBookmarkFill size={20} style={{ marginRight: 4 }} />
            Saved
          </>
        ) : (
          <>
            <RiBookmarkLine size={20} style={{ marginRight: 4 }} />
            Save
          </>
        )}
      </Button>

      {showLogInModal && !props.isLoggedIn && (
        <Modal
          initialModal={"Log In"}
          onClose={() => setShowLogInModal(false)}
        />
      )}
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(SaveJobButton);
