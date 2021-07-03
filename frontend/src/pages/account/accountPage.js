import { useEffect, useState } from "react";
import { connect } from "react-redux";

import SavedJobs from "components/SavedJobs/SavedJobs";

const AccountPage = (props) => {
    const [accountName, setAccountName] = useState(props.username);

    useEffect(() => {
      setAccountName(props.username);
    }, [props.username]);


    return (
      <>
        {accountName === null ? (
          <div style={{ marginLeft: "40px" }}>
            <h2> Please log in to view the account page!</h2>
          </div>
        ) : (
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <div style={{ marginLeft: "40px" }}>
              <h2>
                Welcome <b>{accountName}</b>
              </h2>
            </div>
            <SavedJobs />
          </div>
        )}
      </>
    );
}

// Injecting redux logged-in states into props for header
const mapStateToProps = (state) => ({
  username: state.username
});

export default connect(mapStateToProps)(AccountPage);
