import { Button, Tooltip } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import './styles.css';

function Review(props){
  // body={review.body}
  // author={review.author}
  // workLifeBalance={review.workLifeBalance}
  // culture={review.culture}
  // interestingWork={review.interestingWork}
  // overallRating={review.overallRating}
  // upvoters={review.upvoters}
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div className="review-average-container">
          <div className="review-average">
            <span className="review-rating">{props.overallRating}/10</span>
            overall
          </div>
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
        <p className="review-body">{props.body}</p>
        <Tooltip title="This review was helpful">
          <Button style={{ margin: "10px 0 -12px 28px", width: "max-content" }}>
            Helpful ({props.upvoters.length})
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Review;