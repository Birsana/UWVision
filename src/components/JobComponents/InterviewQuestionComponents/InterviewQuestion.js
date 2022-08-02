import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./styles.css";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { upvoteInterviewQuestion } from "backendActions";
import { FaUserAlt } from "react-icons/fa";

function InterviewQuestion(props) {
  const [num, setNum] = useState(props.numUpvotes ? props.numUpvotes : 0);
  const [disabled, setDisabled] = useState(props.loggedIn ? false : true);
  const [upvoted, setUpvoted] = useState(props.upvoted ? props.upvoted : false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isSmallMobile = useMediaQuery("(max-width: 320px)");

  const upvote = async () => {
    setDisabled(true);
    upvoteInterviewQuestion(props.id, props.token).then(
      (res) => {
        if (res.data.response === "upvoted interview question") {
          setNum(num + 1);
          setUpvoted(true);
          setDisabled(false);
        } else {
          setNum(num - 1);
          setUpvoted(false);
          setDisabled(false);
        }
      }
    );
  };

  return (
    <div className="question-container">
      <p className="question-body">{props.body}</p>
      <div className="review-footer" style={{ margin: "20px 0 -6px -6px" }}>
        <IconButton
          color="inherit"
          style={{ padding: 0 }}
          className="profile-button"
          disabled
        >
          <div className="profile">
            <FaUserAlt size={12} />
          </div>
        </IconButton>
        {isMobile ? (
          <div>
            <IconButton
              disabled={disabled}
              style={
                upvoted
                  ? {
                      color: "#2196f3",
                      fontWeight: 600,
                      fontSize: 16,
                      padding: isSmallMobile ? 4 : 12,
                    }
                  : {
                      fontWeight: 600,
                      fontSize: 16,
                      padding: isSmallMobile ? 4 : 12,
                    }
              }
              onClick={() => upvote()}
            >
              {upvoted ? (
                <RiThumbUpFill size={18} style={{ marginRight: 4 }} />
              ) : (
                <RiThumbUpLine size={18} style={{ marginRight: 4 }} />
              )}
              {num}
            </IconButton>
            {/* If this is user's review, show Edit and Delete. Else, show Report. (Maybe show save in the future) */}
            {/* {props.isAuthor ?
              <>
                <IconButton disabled={!props.loggedIn} style={{ fontWeight: 600, padding: isSmallMobile ? 4 : 12 }}>
                  <BiPencil size={18} />
                </IconButton>
                <IconButton disabled={!props.loggedIn} style={{ fontWeight: 600, padding: isSmallMobile ? 4 : 12 }}>
                  <BiTrashAlt size={18} />
                </IconButton>
              </>
            :
              <IconButton disabled={!props.loggedIn} style={{ fontWeight: 600, padding: isSmallMobile ? 4 : 12 }}>
                <BiFlag size={18} />
              </IconButton>
            } */}
          </div>
        ) : (
          <div>
            <Button
              disabled={disabled}
              style={
                upvoted
                  ? { color: "#2196f3", fontWeight: 600 }
                  : { color: "grey", fontWeight: 600 }
              }
              onClick={() => upvote()}
            >
              {upvoted ? (
                <RiThumbUpFill style={{ marginRight: 6 }} size={18} />
              ) : (
                <RiThumbUpLine style={{ marginRight: 6 }} size={18} />
              )}
              Helpful ({num})
            </Button>
            {/* If this is user's review, show Edit and Delete. Else, show Report. (Maybe show save in the future) */}
            {/* {props.isAuthor ?
              <>
                <Button disabled={!props.loggedIn} style={{ fontWeight: 600, marginRight: 6 }}>
                  <BiPencil style={{ marginRight: 6 }} size={18} />
                  Edit
                </Button>
                <Button disabled={!props.loggedIn} style={{ fontWeight: 600 }}>
                  <BiTrashAlt style={{ marginRight: 6 }} size={18} />
                  Delete
                </Button>
              </>
            :
              <Button disabled={!props.loggedIn} style={{ fontWeight: 600 }}>
                <BiFlag style={{ marginRight: 6 }} size={18} />
                Report
              </Button>
            } */}
          </div>
        )}
      </div>
    </div>
  );
}

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(InterviewQuestion);
