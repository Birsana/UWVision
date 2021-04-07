import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        fontFamily: 'Roboto Slab'
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