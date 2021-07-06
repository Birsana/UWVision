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
import axios from "axios";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    border: "none",
    padding: "8px 10px"
  },
}))(Button);

const JobPage = (props) => {
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [salaries, setSalaries] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageArray, setAverageArray] = useState([0, 0, 0, 0, 0]) // averageRating, averageCulture, averageWorklife, averageInteresting, numReviews
    const [isJobValid, setIsJobValid] = useState(true);
    const company = props.match.params.id;
    const job = props.match.params.jobId;
  
    useEffect(() => {
      const request = `http://localhost:5000/job/${company}/${job}/`;
      axios.get(request + 'salaries')
        .then((response) => {
          setSalaries(response.data)
        })
        .catch((error) => {
          setIsJobValid(false);
        })
      axios.get(request + 'questions')
        .then((response) => {
          setQuestions(response.data)
        })
        .catch((error) => {
          setIsJobValid(false);
        })
      axios.get(request + 'reviews')
        .then((response) => {
          setReviews(response.data)
        })
        .catch((error) => {
          setIsJobValid(false);
        })
      axios.get(request + 'rating')
        .then((response) => {
          setAverageArray(response.data)
        })
        .catch((error) => {
          setIsJobValid(false);
        })
    }, [job]);

    useEffect(() => {
      setShowSalaryModal(false);
      setShowInterviewModal(false);
      setShowReviewModal(false);
    }, [props.isLoggedIn]);

    return (
      <>
        <div className="container job-container">
          <div className="header">
            <p className="company">{company}</p>
            <p className="job">{job}</p>
          </div>
          <div className="body">
            <div className="salary-reviews-container">
              <h2 className="sub-header" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  Salaries ({salaries.length})
                  <MdMonetizationOn size={24} style={{ marginLeft: 10 }} />
                </span>
                <div className="add-button" onClick={() => setShowSalaryModal(true)}>
                  Add
                </div>
              </h2>
              <div className="graph">
                <BarGraph salaries={salaries} />
              </div>
              <div>
                <h2 className="sub-header" style={{ marginTop: 30 }}>
                  Reviews ({reviews.length})
                  <MdQuestionAnswer size={24} style={{ marginLeft: 10 }} />
                </h2>
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
                <div className="write-container">
                  <div className="write-text">How was your experience at {company}?</div>
                  <ColorButton onClick={() => setShowReviewModal(true)}>Write a review</ColorButton>
                </div>
                {reviews.map((review, index) => {
                  return (
                    <Review 
                      job={job}
                      company={company}
                      body={review.body}
                      author={review.author}
                      workLifeBalance={review.workLife}
                      culture={review.Culture}
                      interestingWork={review.interestingWork}
                      upvoters={review.upvoters}
                      id={review.id}
                      key={index}
                    />
                  )
                })}
              </div>
            </div>
            <div className="interview-container">
              <h2 className="sub-header" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  Interview questions ({questions.length})
                  <BsQuestionSquareFill size={20} style={{ marginLeft: 10, marginTop: "auto", marginBottom: "auto" }} />
                </span>
                <div className="add-button" onClick={() => setShowInterviewModal(true)}>
                  Add
                </div>
              </h2>
              <div className="questions-container">
                {questions.map((question, index) => {
                  return (
                    <div className="question">
                      <InterviewQuestion
                        job={job}
                        company={company}
                        upvoters={question.upvoters}
                        body={question.body}
                        author={question.author}
                        id={question.id}
                        key={index}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {showSalaryModal && (
          <Modal
            initialModal={"Add Salary"}
            job={job}
            company={company}
            onClose={() => {
              setShowSalaryModal(false);
            }}
            onSubmit={(salary) => setReviews(salaries => [...salaries, salary])}
          />
        )}
        {showInterviewModal && (
          <Modal
            initialModal={"Add Interview"}
            job={job}
            company={company}
            onClose={() => {
              setShowInterviewModal(false);
            }}
            onSubmit={(question) => setReviews(questions => [...questions, question])}
          />
        )}
        {showReviewModal && (
          <Modal
            initialModal={"Add Review"}
            job={job}
            company={company}
            onClose={() => {
              setShowReviewModal(false);
            }}
            onSubmit={(review) => setReviews(reviews => [...reviews, review])}
          />
        )}
      </>
    );
  };
  
export default JobPage;