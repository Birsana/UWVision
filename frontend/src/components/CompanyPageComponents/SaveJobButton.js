import {Button} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';
import { MdRemoveRedEye } from "react-icons/md"
import { connect } from "react-redux";
import Modal from 'components/Modals/Modal';
import { saveJobToUser } from 'backendActions';


// Material-UI Specific Styling:
const useStyles = makeStyles((theme) => ({
    buttonStyleNotSaved: {
      marginTop: "27px",
      marginBottom: "-30px",
      marginRight: "40px",
      textTransform: "none",
      fontFamily: "Roboto",
      fontSize: "16px",
      color: "#939393"
    },

    buttonStyleSaved: {
        marginTop: "27px",
        marginBottom: "-30px",
        marginRight: "40px",
        textTransform: "none",
        fontFamily: "Roboto",
        fontSize: "16px",
        color: "#00C2FF"
      }
}));

const SaveJobButton = (props) => {
    const [isSaved, setIsSaved] = useState(props.accountPage);  //! How can we determine this based on their list of already saved jobs
    const [showLogInModal, setShowLogInModal] = useState(false);

    useEffect(() => {
        if (props.isLoggedIn) {
            setShowLogInModal(false)
        }
    }, [props.isLoggedIn])


    const styles = useStyles();

    const onClick = (event) => {
        event.stopPropagation();

        if (props.isLoggedIn) {
            setIsSaved(!isSaved);
            saveJobToUser(props.companyName, props.jobName, props.token) // Backend call 
            //! May need to set a rate limit for this
        } else {
            setShowLogInModal(true);
        }
    }

    return (
      <>
        {isSaved ? (
          <Button onClick={onClick} className={styles.buttonStyleSaved}>
            <MdRemoveRedEye
              size={23}
              style={{ marginRight: 7, marginTop: -2 }}
            />
            Saved
          </Button>
        ) : (
          <Button onClick={onClick} className={styles.buttonStyleNotSaved}>
            <MdRemoveRedEye
              size={23}
              style={{ marginRight: 7, marginTop: -2 }}
            />
            Save
          </Button>
        )}

        {showLogInModal && !props.isLoggedIn && (
          <Modal
            initialModal={"Log In"}
            onClose={() => setShowLogInModal(false)}
          />
        )}
      </>
    );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
export default connect(mapStateToProps)(SaveJobButton);
