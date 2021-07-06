import { Button, Tooltip } from '@material-ui/core'
import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function InterviewQuestion(props){
  const [num, setNum] = useState(props.numUpvotes ? props.numUpvotes : 0)
  const [upvoted, setUpvoted] = useState(props.upvoted ? props.upvoted : false)

  const upvote = async () => {
    axios({
      method: "POST",
      url: `http://localhost:5000/job/${props.company}/${props.job}/question/${props.id}`,
      data: {},
      headers: {
        Authorization: `Token ${props.token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then((res) => {
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
      <Tooltip title="This interview question was helpful">
        <Button color={upvoted ? 'secondary' : 'inherit'} style={{ margin: "10px 0 -12px -6px", width: "max-content" }} onClick={() => upvote()}>
          Helpful ({num})
        </Button>
      </Tooltip>
    </div>
  );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(InterviewQuestion);