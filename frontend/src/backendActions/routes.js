const server =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:8000"
    : "UWVision-test.us-east-1.elasticbeanstalk.com";



// TODO: Remove this route
const userRoutes = `http://localhost:8001/auth`;

const API = `${server}/api`;
const routes = {
  // User Routes:
  logInRoute: () => {
    return `${API}/post/user/login`;
  },
  // TODO: User sign-up route
  // TODO: User email confirmation route
  // TODO: User password reset route

  // Company Routes:
  getAllCompaniesRoute: () => {
    return `${API}/get/company/all`;
  },
  getCompanyRoute: (companyName) => {
    return `${API}/get/company/${companyName}`;
  },
  addCompanyRoute: () => {
    return `${API}/post/company`;
  },

  // Job Routes
  getAllJobsForCompanyRoute: (companyName) => {
    return `${API}/get/company/${companyName}/job/all`;
  },
  getAllSavedJobsForUser: () => {
    return `${API}/get/job/saved/all`;
  },
  saveJobRoute: () => {
    return `${API}/post/job/save`;
  },
  addJobRoute: () => {
    return `${API}/post/job`;
  },
  getJobRoute: (companyName, jobName) => {
    return `${API}/get/company/${companyName}/job/${jobName}`;
  },

  // Salary Routes
  getAllSalariesForJobRoute: (jobId) => {
    return `${API}/get/job/${jobId}/salary/all`;
  },
  addSalaryRoute: (jobId) => {
    return `${API}/post/salary`;
  },

  // Review Routes
  getAllReviewsForJobRoute: (jobId) => {
    return `${API}/get/job/${jobId}/review/all`;
  },
  upvoteReviewRoute: () => {
    return `${API}/post/review/upvote`;
  },
  addReviewRoute: () => {
    return `${API}/post/review`;
  },

  // Interview Question Routes
  getAllInterviewQuestionsForJobRoute: (jobId) => {
    return `${API}/get/job/${jobId}/interview_question/all`;
  },
  upvoteInterviewQuestionRoute: () => {
    return `${API}/post/interview_question/upvote`;
  },
  addInterviewQuestionRoute: () => {
    return `${API}/post/interview_question`;
  },


  // === OLD ===
  // User Routes:
  SIGNUP: () => {
    return `${userRoutes}/users`;
  },
  ISEMAILCONFIRMED: (username) => {
    return `${userRoutes}/isconfirmed/${username}`;
  },
  SENDRESETEMAIL: () => {
    return `${userRoutes}/sendresetemail`;
  },
  RESETPASSWORD: (resetToken) => {
    return `${userRoutes}/forgotpassword/${resetToken}`;
  },
};

export default routes;
