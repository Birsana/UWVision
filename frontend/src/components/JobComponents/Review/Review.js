import { Button } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import './styles.css';
import { connect } from "react-redux";
import { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri"
import { BiPencil, BiTrashAlt, BiFlag } from "react-icons/bi"
import { upvoteReview } from 'backendActions';

function Review(props){
  const [num, setNum] = useState(props.numUpvotes ? props.numUpvotes : 0)
  const [upvoted, setUpvoted] = useState(props.upvoted ? props.upvoted : false)
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isSmallMobile = useMediaQuery("(max-width: 320px)");

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

  const renderStars = (num) => {
    const stars = [];
    let color;

    if (num === 5) {
      color = "rgba(118,220,153,255)";
    } else if (num === 4) {
      color = "rgba(183,234,131,255)";
    } else if (num === 3) {
      color = "rgba(246,215,87,255)";
    } else if (num === 2) {
      color = "rgba(251,184,81,255)";
    } else {
      color = "rgba(241,122,85,255)";
    }

    for (let i = 0; i < num; i++) { // Filled stars
      stars.push(
        <AiFillStar key={i} color={color} />
      )
    }

    for (let i = 0; i < 5 - num; i++) { // Empty stars
      stars.push(
        <AiOutlineStar key={5-i} color={color} />
      )
    }

    return stars;
  }

  return (
    <div className="review-container">
      <div className="review-info">
        <span className="review-title">
          {props.job} | <span style={{fontWeight: 600, color: "black"}}>{`${props.term[0].toUpperCase() + props.term.slice(1)} ${props.year}`}</span>
        </span>
        <div className="review-average-container">
          <div className="review-average">
            <span className="review-rating">
              {renderStars(props.overall)}
            </span>
            Overall
          </div>
          <div className="review-average">
            <span className="review-rating">
              {renderStars(props.culture)}
            </span>
            Culture
          </div>
          <div className="review-average">
            <span className="review-rating">
              {renderStars(props.interestingWork)}
            </span>
            Interesting Work
          </div>
          <div className="review-average">
            <span className="review-rating">
              {renderStars(props.workLifeBalance)}
            </span>
            Work-life Balance
          </div>
        </div>
        { props.body !== '' &&
          <>
            <p className="review-body">{props.body}</p>
            <div className="review-footer">
              <IconButton
                color="inherit"
                style={{ padding: 0 }}
                className="profile-button"
                disabled
              >
                <div className="profile">
                  {/* {props.author.substr(0, 1)} */}
                </div>
              </IconButton>
              {isMobile ?
                <div>
                  <IconButton disabled={!props.loggedIn} style={ upvoted ? { color: "#2196f3", fontWeight: 600, fontSize: 16, padding: isSmallMobile ? 4 : 12 } : { fontWeight: 600, fontSize: 16, padding: isSmallMobile ? 4 : 12 }} onClick={() => upvote()}>
                    { upvoted ?
                        <RiThumbUpFill size={18} style={{ marginRight: 4 }} />
                      :
                        <RiThumbUpLine size={18} style={{ marginRight: 4 }} />
                    }
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
              :
                <div>
                  <Button disabled={!props.loggedIn} style={ upvoted ? { color: "#2196f3", fontWeight: 600, marginRight: 6 } : { fontWeight: 600, marginRight: 6 }} onClick={() => upvote()}>
                    { upvoted ?
                        <RiThumbUpFill style={{ marginRight: 6 }} size={18} />
                      :
                        <RiThumbUpLine style={{ marginRight: 6 }} size={18} />
                    }
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
              }
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