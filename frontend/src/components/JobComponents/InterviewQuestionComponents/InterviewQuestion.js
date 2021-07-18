import { Button } from '@material-ui/core'
import { connect } from "react-redux";
import { useState } from "react";
import './styles.css';

import { upvoteQuestion } from 'backendActions'

function InterviewQuestion(props){
  const [num, setNum] = useState(props.numUpvotes ? props.numUpvotes : 0)
  const [upvoted, setUpvoted] = useState(props.upvoted ? props.upvoted : false)

  const upvote = async () => {
    upvoteQuestion(props.company, props.job, props.id, props.token).then((res) => {
      if (res.data === "upvoted") {
        setNum(num + 1);
        setUpvoted(true);
      } else {
        setNum(num - 1);
        setUpvoted(false);
      }
    });
  }

  return (
    <div className="question-container">
      <p className="question-body">{props.body}</p>
      <Button disabled={!props.loggedIn} color={upvoted ? 'secondary' : 'inherit'} style={{ margin: "10px 0 -12px -6px", width: "max-content", fontWeight: "600" }} onClick={() => upvote()}>
        Helpful ({num})
      </Button>
    </div>
  );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(InterviewQuestion);