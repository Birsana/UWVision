import { useState, useEffect } from "react";
import './styles.css';
import BarGraph from '../../components/JobComponents/BarGraph'
import InterviewQuestion from '../../components/JobComponents/InterviewQuestionComponents/InterviewQuestion'
import Review from '../../components/JobComponents/Review/Review'
import { MdMonetizationOn, MdQuestionAnswer } from "react-icons/md"
import { BsQuestionSquareFill } from "react-icons/bs"
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Modal from "components/Modals/Modal";
import { connect } from "react-redux";
import { getSalaries, getQuestions, getReviews, getRatings } from "backendActions"
import { HiOutlineEmojiSad } from "react-icons/hi";
import Loader from "react-loader-spinner";
import Fade from 'react-reveal/Fade';

const ReviewButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    border: "none",
    padding: "8px 10px",
    width: 150
  },
}))(Button);

const AddButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    border: "none",
    padding: "4px 0",
    [theme.breakpoints.down(520)]: {
      padding: 0
    }
  },
}))(Button);

const JobPage = (props) => {
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [salaries, setSalaries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false); // Interview questions - Loading state
  const [fadeQuestions, setFadeQuestions] = useState(false); // Interview questions - If they have already been faded in
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false); // User reviews - Loading state
  const [averageArray, setAverageArray] = useState([0, 0, 0, 0, 0]); // averageRating, averageCulture, averageWorklife, averageInteresting, numReviews
  const company = props.match.params.id;
  const job = props.match.params.jobId;

  useEffect(() => {
    getSalaries(company, job)
      .then((response) => {
        setSalaries(response.data);
      })
    getQuestions(company, job, props.token)
      .then((response) => {
        setQuestions(response.data);
        setShowQuestions(true);
      })
    getReviews(company, job, props.token)
      .then((response) => {
        setReviews(response.data);
        setShowReviews(true)
      })
    getRatings(company, job)
      .then((response) => {
        setAverageArray(response.data);
      })
  }, [company, job, props.token]);

  useEffect(() => {
    setShowSalaryModal(false);
    setShowInterviewModal(false);
    setShowReviewModal(false);
  }, [props.isLoggedIn]);

  const addReview = (review) => {
    setReviews((reviews) => [...reviews, review]);
    getRatings(company, job)
      .then((response) => {
        setAverageArray(response.data);
      })
  };

  // Loading spinner used when data is still being fetched from backend
  const LoadingSpinner = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Loader type="Oval" color="#2196f3" height={60} width={60} />
      </div>
    );
  };

  // Renders list of all user reviews
  const RenderReviews = () => {
    if (!showReviews) {
      return <LoadingSpinner />;
    } else {
      return reviews.length !== 0 ? (
        reviews.map((review, index) => {
          return (
            <Fade duration={500} key={index}>
              <Review
                job={job}
                company={company}
                body={review.body}
                author={review.author}
                workLifeBalance={review.workLifeBalance}
                culture={review.culture}
                interestingWork={review.interestingWork}
                numUpvotes={review.numUpvotes}
                upvoted={review.upvoted}
                id={review.id || review._id}
                loggedIn={props.token !== null}
              />
            </Fade>
          );
        })
      ) : (
        <div className="no-reviews-questions">
          No reviews yet
          <HiOutlineEmojiSad
            style={{ marginTop: 10 }}
            size={72}
            color="rgba(0, 0, 0, 0.1)"
          />
        </div>
      );
    }
  };

  // Renders list of all interview questions
  const RenderQuestions = () => {
    if (!showQuestions) {
      return <LoadingSpinner />;
    } else {
      return questions.length !== 0 ? (
        questions.map((question, index) => {
          return (
            <Fade duration={500} key={index}>
              <div className="question">
                <InterviewQuestion
                  job={job}
                  company={company}
                  numUpvotes={question.numUpvotes}
                  upvoted={question.upvoted}
                  body={question.body}
                  author={question.author}
                  id={question.id || question._id}
                  loggedIn={props.token !== null}
                />
              </div>
            </Fade>
          );
        })
      ) : (
        <div className="no-reviews-questions">
          No questions yet
          <HiOutlineEmojiSad
            style={{ marginTop: 10 }}
            size={72}
            color="rgba(0, 0, 0, 0.1)"
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="container job-container">
        <div className="header">
          <p className="company">{company}</p>
          <p className="job">{job}</p>
        </div>
        <div className="body">
          <div className="salary-reviews-container">
            <h2
              className="sub-header"
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <MdMonetizationOn
                  size={24}
                  className="icon"
                  style={{ marginRight: 6 }}
                />
                Salaries ({salaries.length})
              </span>
              <AddButton onClick={() => setShowSalaryModal(true)}>
                Add
              </AddButton>
            </h2>
            <div className="graph">
              <BarGraph salaries={salaries} />
            </div>
            <div>
              <h2 className="sub-header" style={{ marginTop: 30 }}>
                <MdQuestionAnswer size={24} className="icon" />
                Reviews ({reviews.length})
              </h2>
              {reviews.length !== 0 && (
                <div className="average-container">
                  <div className="average">
                    <span className="average-rating">{averageArray[0]}/10</span>
                    overall
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[1]}/10</span>
                    culture
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[3]}/10</span>
                    interesting work
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[2]}/10</span>
                    work-life balance
                  </div>
                </div>
              )}
              <div className="write-container">
                <div className="write-text">
                  How was your experience at {company}?
                </div>
                <ReviewButton onClick={() => setShowReviewModal(true)}>
                  Write a review
                </ReviewButton>
              </div>
              <RenderReviews />
            </div>
          </div>
          <div className="interview-container">
            <h2
              className="sub-header"
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <BsQuestionSquareFill className="icon" size={20} />
                Interview questions ({questions.length})
              </span>
              <AddButton onClick={() => setShowInterviewModal(true)}>
                Add
              </AddButton>
            </h2>
            <div className="questions-container">
              <RenderQuestions />
            </div>
          </div>
        </div>
      </div>
      {showSalaryModal && (
        <Modal
          initialModal={props.token ? "Add Salary" : "Log In"}
          job={job}
          company={company}
          onClose={() => {
            setShowSalaryModal(false);
          }}
          onSubmit={(salary) =>
            setSalaries((salaries) => [...salaries, salary])
          }
        />
      )}
      {showInterviewModal && (
        <Modal
          initialModal={props.token ? "Add Interview" : "Log In"}
          job={job}
          company={company}
          onClose={() => {
            setShowInterviewModal(false);
          }}
          onSubmit={(question) =>
            setQuestions((questions) => [...questions, question])
          }
        />
      )}
      {showReviewModal && (
        <Modal
          initialModal={props.token ? "Add Review" : "Log In"}
          job={job}
          company={company}
          onClose={() => {
            setShowReviewModal(false);
          }}
          onSubmit={(review) => addReview(review)}
        />
      )}
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});
  
export default connect(mapStateToProps)(JobPage);