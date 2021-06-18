import { useEffect, useState } from "react";
import { connect } from "react-redux";

const AccountPage = (props) => {
    const [accountName, setAccountName] = useState(props.username);
    const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);

    useEffect(() => {
      setAccountName(props.username);
      setLoggedIn(props.isLoggedIn);
    }, [props.isLoggedIn]);


    return (
      <div style={{ marginLeft: "60px" }}>
        {loggedIn ? (
          <h2>
            Welcome <b>{accountName}</b>
          </h2>
        ) : (
          <h2> Not logged in</h2>
        )}
      </div>
    );
}

// Injecting redux logged-in states into props for header
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  username: state.username
});

export default connect(mapStateToProps)(AccountPage);
