import { Button, Tooltip } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import './styles.css';
import { connect } from "react-redux";
import { useState } from "react";

import { upvoteReview } from 'backendActions';

function Review(props){
  const [num, setNum] = useState(props.numUpvotes ? props.numUpvotes : 0)
  const [upvoted, setUpvoted] = useState(props.upvoted ? props.upvoted : false)

  const upvote = async () => {
    upvoteReview(props.company, props.job, props.id, props.token).then((res) => {
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
    <div className="review-container">
      <IconButton
        color="inherit"
        style={{ padding: 0 }}
        className="profile-button"
        disabled
      >
        <div className="profile">
          {props.author.substr(0, 1)}
        </div>
      </IconButton>
      <div className="review-info">
        <div className="review-average-container">
          <div className="review-average">
            <span className="review-rating">{props.culture}/10</span>
            culture
          </div>
          <div className="review-average">
            <span className="review-rating">{props.interestingWork}/10</span>
            interesting work
          </div>
          <div className="review-average">
            <span className="review-rating">{props.workLifeBalance}/10</span>
            work-life balance
          </div>
        </div>
        { props.body !== '' &&
          <>
            <p className="review-body">{props.body}</p>
            <div className="helpful-button">
              <Tooltip title="This review was helpful">
                <span>
                  <Button disabled={!props.loggedIn} color={upvoted ? 'secondary' : 'inherit'} style={{ width: "max-content", fontWeight: "600" }} onClick={() => upvote()}>
                    Helpful ({num})
                  </Button>
                </span>
              </Tooltip>
            </div>
          </>
        }
      </div>
    </div>
  );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(Review);