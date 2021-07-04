import { Button, Tooltip } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import './styles.css';
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";

function Review(props){
  const [num, setNum] = useState(props.upvoters ? props.upvoters.length : 0)

  const upvote = async () => {
    axios({
      method: "POST",
      url: `http://localhost:5000/job/${props.company}/${props.job}/review/${props.id}`,
      data:{},
      headers: {
        Authorization: `Token ${props.token}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((res) => {
      if (res.data === "upvoted") {
        setNum(num + 1);
      } else {
        setNum(num - 1);
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
        <p className="review-body">{props.body}</p>
        <div className="helpful-button">
          <Tooltip title="This review was helpful">
            <Button style={{ width: "max-content" }} onClick={() => upvote()}>
              Helpful ({num})
            </Button>
          </Tooltip>
        </div>
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