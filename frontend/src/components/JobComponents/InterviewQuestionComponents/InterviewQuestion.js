import {Button, Tooltip } from '@material-ui/core'

function InterviewQuestion(props){

    return (
        <div className="comment">
          <h2 className="commentAuthor">
          </h2>
          <Tooltip title="I also had this">
          <Button variant="contained">
            {props.upvoters.length}
            </Button>
            </Tooltip>
          {props.children}
        </div>
      );

}

export default InterviewQuestion;