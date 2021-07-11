import React, { useState } from "react";

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// Component Imports:
import Modal from "components/Modals/Modal";

// Redux Import:
import { connect } from "react-redux";

// Material-UI Specific Styling:
const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    background: 'rgba(229, 229, 229)',
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    boxShadow: "0px 0px 0px 0px",
    color: "black",
    [theme.breakpoints.down(460)]: {
      display: "none"
    }
  },
  buttonText: {
    fontWeight: "bold",
    margin: "0 4px"
  }
}));

// ==============================================================================================================

// Add Company Button Component
const AddCompanyButton = (props) => {
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  const handleClick = () => {
    setShowAddCompanyModal(true);
  };

  const styles = useStyles();

  return (
    <>
      <div>
        <Fab
          variant={props.company === '' ? 'round' : 'extend'}
          size="small"
          className={styles.buttonStyle}
          onClick={handleClick}
        >
          {props.company !== '' && <p className={styles.buttonText}>Add {props.company}</p>}
          <AddIcon className={styles.extendedIcon} />
          {/* Add Company */}
        </Fab>
      </div>

      {(!props.isLoggedIn && showAddCompanyModal) && (
        <Modal
        initialModal={"Log In"}
        onClose={() => setShowAddCompanyModal(false)}
        />
      )}

      {(props.isLoggedIn && showAddCompanyModal) && (
        <Modal
        initialModal={"Add Company"}
        onClose={() => setShowAddCompanyModal(false)}
        />
      )}
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(AddCompanyButton);
