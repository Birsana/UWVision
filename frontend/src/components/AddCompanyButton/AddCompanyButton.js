import React, { useState } from "react";

// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// Component Imports:
import Modal from "components/Modals/Modal";

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
}));

// ==============================================================================================================

// Add Company Button Component
const AddCompanyButton = () => {
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  const handleClick = () => {
    setShowAddCompanyModal(true);
  };

  const styles = useStyles();

  return (
    <>
      <div>
        <Fab
          // variant="extended"
          size="small"
          className={styles.buttonStyle}
          onClick={handleClick}
        >
          <AddIcon className={styles.extendedIcon} />
          {/* Add Company */}
        </Fab>
      </div>

      {showAddCompanyModal && (
        <Modal
          initialModal={"Add Company"}
          onClose={() => setShowAddCompanyModal(false)}
        />
      )}
    </>
  );
};

export default AddCompanyButton;
