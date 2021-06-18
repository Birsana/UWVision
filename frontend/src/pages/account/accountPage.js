import { useEffect, useState } from "react";
import { connect } from "react-redux";

const AccountPage = (props) => {
    const [accountName, setAccountName] = useState(props.username);

    useEffect(() => {
      setAccountName(props.username);
    }, [props.username]);


    return (
      <div style={{ marginLeft: "60px" }}>
        {(accountName !== null) ? (
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
  username: state.username
});

export default connect(mapStateToProps)(AccountPage);
