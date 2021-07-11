// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Component Imports:
import Modal from "components/Modals/Modal";
import { useState } from "react";

// Material-UI Specific Styling:
const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    background: "#2196f3",
    fontSize: 16,
    textTransform: "none",
    boxShadow: "0px 0px 0px 0px",
    color: "white",
    borderRadius: 10,
    padding: "8px 17px 8px 14px",
    marginTop: "12px",
    "&:hover": {
      backgroundColor: "#1976d2",
      boxShadow: "0px 0px 0px 0px",
    },
    "&:focus": {
      boxShadow: "0px 0px 0px 0px",
    },
  },

  extendedIcon: {
    marginRight: 5,
    height: 22,
    width: 22
  },
}));

// ==============================================================================================================

// Add Job Button Component
const AddJobButton = () => {
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const styles = useStyles();

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className={styles.buttonStyle}
        onClick={() => setShowAddJobModal(true)}
      >
        <AddIcon className={styles.extendedIcon} />
        Add a job
      </Button>

      {showAddJobModal && (
        <Modal
          initialModal={"Add Job"}
          onClose={() => setShowAddJobModal(false)}
        />
      )}
    </>
  );
};

export default AddJobButton;
