// Material-UI Imports:
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    height: 44,
    width: 130,
    marginTop: "12px",
    "&:hover": {
      backgroundColor: "#1976d2",
      boxShadow: "0px 0px 0px 0px",
    },
    "&:focus": {
      boxShadow: "0px 0px 0px 0px",
    },
    [theme.breakpoints.down(820)]: {
      fontSize: 14,
      height: 40,
      width: 112,
      marginTop: 0
    },
    [theme.breakpoints.down(520)]: {
      height: 36,
      width: 72
    }
  },

  extendedIcon: {
    marginRight: 5,
    marginLeft: -4,
    height: 22,
    width: 22
  },
}));

// ==============================================================================================================

// Add Job Button Component
const AddJobButton = () => {
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const styles = useStyles();
  const isMobile = useMediaQuery("(max-width: 520px)");

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className={styles.buttonStyle}
        onClick={() => setShowAddJobModal(true)}
      >
        {!isMobile ?
          <>
            <AddIcon className={styles.extendedIcon} />
            Add a job
          </>
          : 
          'Add job'
        }
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
