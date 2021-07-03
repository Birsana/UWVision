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

    useEffect(() => {
      setShowSalaryModal(false);
      setShowInterviewModal(false);
      setShowReviewModal(false);
    }, [props.isLoggedIn]);
  
    const data = {
      jobName: "Software Developer Intern",
      company: "Apple",
      // threads: [{ 
      //   id: '',
      //   title: 'I loved working here',
      //   body: 'Awesome place to work lololol so awesome lol',
      //   slug: '',
      //   createdAt: '09/01/31',
      //   author: 'Justin Chu'
      //  }],
      questions: [
        { 
          body: 'How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        },
        { 
          body: 'How would you construct a binary search tree in Java?How would you construct a binary search tree in Java?',
          author: 'Justin Chu',
          upvoters: [],
          job: {}
        }
      ],
      reviews: [
        { 
          body: 'Great place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work;',
          author: 'Justin Chu',
          workLifeBalance: 6,
          culture: 10,
          interestingWork: 7,
          overallRating: 9,
          upvoters: []
        },
        { 
          body: 'Great place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams,',
          author: 'Justin Chu',
          workLifeBalance: 6,
          culture: 10,
          interestingWork: 7,
          overallRating: 9,
          upvoters: []
        },
        { 
          body: 'Great place to work; it\'s the stuff of dreams, frfrGreat place to work; it\'s the stuff of dreams,',
          author: 'Justin Chu',
          workLifeBalance: 6,
          culture: 10,
          interestingWork: 7,
          overallRating: 9,
          upvoters: []
        }
      ],
      salaries: [{
        wage: 90000,
        added_by: 'Justin Chu'
      }],
      averageSalary: 120000,
      averageRating: 9.3,
      averageCulture: 8,
      averageWorklife: 7,
      averageInteresting: 6.1
    }

    // const company = props.match.params.id;
    // const job = props.match.params.jobId;
    // const [jobData, setJobData] = useState({})
    // const [isJobValid, setIsJobValid] = useState(null);
  
    // useEffect(() => {
    //   const request = `http://localhost:5000/data/company/${company}`;
    //   axios.get(request)
    //     .then((response) => {
    //       setCompanyData(response.data)
    //       setIsCompanyValid(true);
    //     })
    //     .catch((error) => {
    //       setIsCompanyValid(false);
    //     })
    // }, [job]);

    return (
      <>
        <div className="container job-container">
          <div className="header">
            <p className="company">{data.company}</p>
            <p className="job">{data.jobName}</p>
          </div>
          <div className="body">
            <div className="salary-reviews-container">
              <h2 className="sub-header" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  Salary distribution
                  <MdMonetizationOn size={24} style={{ marginLeft: 10 }} />
                </span>
                <div className="add-button" onClick={() => setShowSalaryModal(true)}>
                  Add
                </div>
              </h2>
              <div className="graph">
                <BarGraph />
              </div>
              <div>
                <h2 className="sub-header" style={{ marginTop: 30 }}>
                  Reviews
                  <MdQuestionAnswer size={24} style={{ marginLeft: 10 }} />
                </h2>
                <div className="average-container">
                  <div className="average">
                    <span className="average-rating">{data.averageRating}/10</span>
                    overall
                  </div>
                  <div className="average">
                    <span className="average-rating">{data.averageCulture}/10</span>
                    culture
                  </div>
                  <div className="average">
                    <span className="average-rating">{data.averageInteresting}/10</span>
                    interesting work
                  </div>
                  <div className="average">
                    <span className="average-rating">{data.averageWorklife}/10</span>
                    work-life balance
                  </div>
                </div>
                <div className="write-container">
                  <div className="write-text">How was your experience at {data.company}?</div>
                  <ColorButton onClick={() => setShowReviewModal(true)}>Write a review</ColorButton>
                </div>
                {data.reviews.map((review, index) => {
                  return (
                    <Review 
                      body={review.body}
                      author={review.author}
                      workLifeBalance={review.workLifeBalance}
                      culture={review.culture}
                      interestingWork={review.interestingWork}
                      overallRating={review.overallRating}
                      upvoters={review.upvoters}
                      key={index}
                    />
                  )
                })}
              </div>
            </div>
            <div className="interview-container">
              <h2 className="sub-header" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  Interview questions
                  <BsQuestionSquareFill size={20} style={{ marginLeft: 10, marginTop: "auto", marginBottom: "auto" }} />
                </span>
                <div className="add-button" onClick={() => setShowInterviewModal(true)}>
                  Add
                </div>
              </h2>
              <div className="questions-container">
                {data.questions.map((question, index) => {
                  return (
                    <div className="question">
                      <InterviewQuestion
                        upvoters={question.upvoters}
                        body={question.body}
                        author={question.author}
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
            initialModal={"Log In"}
            onClose={() => {
              setShowSalaryModal(false);
            }}
          />
        )}
        {showInterviewModal && (
          <Modal
            initialModal={"Log In"}
            onClose={() => {
              setShowInterviewModal(false);
            }}
          />
        )}
        {showReviewModal && (
          <Modal
            initialModal={"Log In"}
            onClose={() => {
              setShowReviewModal(false);
            }}
          />
        )}
      </>
    );
  };
  
export default JobPage;