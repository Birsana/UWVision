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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NavLink } from "react-router-dom";

const ReviewButton = withStyles((theme) => ({
  root: {
    color: "white",
    fontWeight: "bold",
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
    fontWeight: "bold",
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    border: "none",
    padding: "4px 0",
    [theme.breakpoints.down(520)]: {
      padding: 0,
      marginTop: -2,
      color: blue[500],
      fontWeight: "bold",
      width: 40,
      backgroundColor: "white",
      '&:hover': {
        backgroundColor: "white"
      },
    }
  },
}))(Button);

const JobPage = (props) => {
  // Hacky way to fix fade re-rendering:
  // 0: page just rendered, 1: open modal, 2: close modal
  const [showSalaryModal, setShowSalaryModal] = useState(0);
  const [showInterviewModal, setShowInterviewModal] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(0);
  const [salaries, setSalaries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false); // Interview questions - Loading state
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false); // User reviews - Loading state
  const [averageArray, setAverageArray] = useState([0, 0, 0, 0, 0]); // averageRating, averageCulture, averageWorklife, averageInteresting, numReviews
  const isSmallMobile = useMediaQuery("(max-width: 350px)");
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
    if (showSalaryModal !== 0 || showInterviewModal !== 0 || showReviewModal !== 0) {
      setShowSalaryModal(2);
      setShowInterviewModal(2);
      setShowReviewModal(2);
    }
  }, [props.isLoggedIn]);

  const addReview = (review) => {
    setReviews((reviews) => [...reviews, review]);
    getRatings(company, job)
      .then((response) => {
        setAverageArray(response.data);
      })
  };

  const onModalClose = (type, changed = false) => {
    if (type === "Add Salary" && changed) {
      if (window.confirm("Your salary will be lost if you close this modal. Are you sure you want to continue?"))
        setShowSalaryModal(2);
    } else if (type === "Add Interview" && changed) {
      if (window.confirm("Your interview question will be lost if you close this modal. Are you sure you want to continue?"))
        setShowInterviewModal(2);
    } else if (type === "Add Review" && changed) {
      if (window.confirm("Your review will be lost if you close this modal. Are you sure you want to continue?"))
        setShowReviewModal(2);
    } else if (type === "Salary Login" || type === "Add Salary") {
      setShowSalaryModal(2);
    } else if (type === "Interview Login" || type === "Add Interview") {
      setShowInterviewModal(2);
    } else if (type === "Review Login" || type === "Add Review") {
      setShowReviewModal(2);
    }
  }

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
            <Fade
              duration={500}
              key={index}
              disabled={showInterviewModal !== 0 || showReviewModal !== 0 || showSalaryModal !== 0}
            >
              <Review
                job={job}
                company={company}
                year={review.year}
                term={review.term}
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
            <Fade
              duration={500}
              key={index}
              disabled={showInterviewModal !== 0 || showReviewModal !== 0 || showSalaryModal !== 0}
            >
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
          <NavLink
            to={`/company/${company}`}
            style={{ textDecoration: "none", color: "unset", width: "fit-content" }}
          >
            <p className="company">{company}</p>
          </NavLink>
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
              <AddButton onClick={() => setShowSalaryModal(1)}>
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
                    <span className="average-rating">{averageArray[0]}/5</span>
                    overall
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[1]}/5</span>
                    culture
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[3]}/5</span>
                    interesting work
                  </div>
                  <div className="average">
                    <span className="average-rating">{averageArray[2]}/5</span>
                    work-life balance
                  </div>
                </div>
              )}
              <div className="write-container">
                <div className="write-text">
                  How was your experience at {company}?
                </div>
                <ReviewButton onClick={() => setShowReviewModal(1)}>
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
                {isSmallMobile ? 'Interview ' : 'Interview questions '}({questions.length})
              </span>
              <AddButton onClick={() => setShowInterviewModal(1)}>
                Add
              </AddButton>
            </h2>
            <div className="questions-container">
              <RenderQuestions />
            </div>
          </div>
        </div>
      </div>
      {showSalaryModal === 1 && (
        <Modal
          initialModal={props.token ? "Add Salary" : "Log In"}
          job={job}
          company={company}
          onClose={(changed) => onModalClose(props.token ? "Add Salary" : "Salary Login", changed)}
          onSubmit={(salary) =>
            setSalaries((salaries) => [...salaries, salary])
          }
        />
      )}
      {showInterviewModal === 1 && (
        <Modal
          initialModal={props.token ? "Add Interview" : "Log In"}
          job={job}
          company={company}
          onClose={(changed) => onModalClose(props.token ? "Add Interview" : "Interview Login", changed)}
          onSubmit={(question) =>
            setQuestions((questions) => [...questions, question])
          }
        />
      )}
      {showReviewModal === 1 && (
        <Modal
          initialModal={props.token ? "Add Review" : "Log In"}
          job={job}
          company={company}
          onClose={(changed) => onModalClose(props.token ? "Add Review" : "Review Login", changed)}
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