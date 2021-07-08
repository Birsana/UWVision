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
    background: "black",
    fontFamily: "Roboto",
    fontSize: 18,
    textTransform: "none",
    boxShadow: "0px 0px 0px 0px",
    color: "white",
    borderRadius: 10,
    height: "45px",
    paddingRight: "25px",
    paddingLeft: "22px",
    marginTop: "12px",

    "&:hover": {
      backgroundColor: "#535353",
    },
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
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
