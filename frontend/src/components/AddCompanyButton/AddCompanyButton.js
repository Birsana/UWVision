import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

const AddCompanyButton = (props) => {
    const styles = useStyles();

    const handleClick = () => {
        props.history.push("/addCompany");
    
        //TODO: Will need the search bar present even on company pages in case users want to search for another company
      };

    return (
        <div>
            <Fab variant="extended" size="small" className={styles.buttonStyle} onClick={handleClick}>
                <AddIcon className={styles.extendedIcon} />
                Add Company
            </Fab>
        </div>
    );
}
  
export default withRouter(AddCompanyButton);  