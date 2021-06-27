import {Button, Tooltip } from '@material-ui/core'

function InterviewQuestion(props){
  return (
    <div className="question-container">
      <p className="question-body">{props.body}</p>
      <Tooltip title="This interview question was helpful">
        <Button style={{ margin: "10px 0 -12px -6px", width: "max-content" }}>
          Helpful ({props.upvoters.length})
        </Button>
      </Tooltip>
    </div>
  );
}

export default InterviewQuestion;