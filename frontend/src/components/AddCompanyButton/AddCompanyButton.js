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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: '#2196f3',
    fontWeight: 400,
    fontSize: 16,
    textTransform: "none",
    boxShadow: "none",
    color: "white",
    '&:hover': {
      background: '#1976d2',
      boxShadow: 'none',
    },
    "&:focus": {
      boxShadow: "none",
    }
  },
  buttonText: {
    fontWeight: "bold",
    margin: "-1px 2px 0 8px"
  },
  icon: {
    marginRight: 2
  }
}));

// ==============================================================================================================

// Add Company Button Component
const AddCompanyButton = (props) => {
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  const handleClick = () => {
    setShowAddCompanyModal(true);
  };

  const onClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setShowAddCompanyModal(false);
  }

  const styles = useStyles();

  return (
    <>
      <div>
        <Fab
          variant={'extended'}
          size="small"
          className={styles.buttonStyle}
          onClick={handleClick}
        >
          <p className={styles.buttonText}>Add {props.company}</p>
          <AddIcon className={styles.icon} />
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
          company={props.company === 'a company' ? '' : props.company}
          onClose={onClose}
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
