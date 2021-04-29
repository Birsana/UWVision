import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Modal from "components/Modals/Modal";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
      background: 'rgb(193, 193, 193)',
      fontFamily: 'Roboto Slab',
      textTransform: 'none',
      //boxShadow: "0px 0px 0px 0px",
      color: 'black'
  },
  
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

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
          variant="extended"
          size="small"
          className={styles.buttonStyle}
          onClick={handleClick}
        >
          <AddIcon className={styles.extendedIcon} />
          Add Company
        </Fab>
      </div>

      {showAddCompanyModal && (
        <Modal initialModal={"Add Company"} onClose={() => setShowAddCompanyModal(false)} />
      )}
    </>
  );
};

export default AddCompanyButton;
