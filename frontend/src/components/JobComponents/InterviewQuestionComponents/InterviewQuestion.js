import { Button, Tooltip } from '@material-ui/core'
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";

function InterviewQuestion(props){
  const [num, setNum] = useState(props.numUpvoters ? props.numUpvoters : 0)
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
      } else {
        setNum(num - 1);
      }
    });
  }

  return (
    <div className="question-container">
      <p className="question-body">{props.body}</p>
      <Tooltip title="This interview question was helpful">
        <Button style={[{ margin: "10px 0 -12px -6px", width: "max-content" }], [upvoted ? { color: "#2196f3" } : {}]} onClick={() => upvote()}>
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