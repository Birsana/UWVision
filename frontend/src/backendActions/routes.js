const server =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:8000"
    : "https://uwvision.herokuapp.com"; //TODO: Change prod backend URL

const API = `${server}/api`;

// TODO: Remove these
const companyRoutes = `http://localhost:8001/data`;
const userRoutes = `http://localhost:8001/auth`;
const jobRoutes = `http://localhost:8001/job`;

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

  // Company Routes:
  ADDCOMPANY: () => {
    return `${companyRoutes}/addcompany`;
  },
  GETCOMPANY: (company) => {
    return `${companyRoutes}/company/${company}`;
  },
  GETCOMPANYJOBLIST: (company) => {
    return `${companyRoutes}/getcompanydata/${company}`;
  },
  ADDJOBTOCOMPANY: (company) => {
    return `${companyRoutes}/${company}/addjob`;
  },

  // User Routes:
  LOGIN: () => {
    return `${userRoutes}/users/login`;
  },
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
  SAVEJOBTOUSER: (company, job) => {
    return `${jobRoutes}/${company}/${job}/save`;
  },
  GETSAVEDJOBS: () => {
    return `${jobRoutes}/savedjobs`;
  },

  // Job Routes:
  GETSALARIES: (company, job) => {
    return `${jobRoutes}/${company}/${job}/salaries`;
  },
  GETQUESTIONS: (company, job) => {
    return `${jobRoutes}/${company}/${job}/questions`;
  },
  GETREVIEWS: (company, job) => {
    return `${jobRoutes}/${company}/${job}/reviews`;
  },
  GETRATINGS: (company, job) => {
    return `${jobRoutes}/${company}/${job}/rating`;
  },
  POSTSALARY: (company, job) => {
    return `${jobRoutes}/${company}/${job}/salary`;
  },
  POSTQUESTION: (company, job) => {
    return `${jobRoutes}/${company}/${job}/question`;
  },
  UPVOTEQUESTION: (company, job, id) => {
    return `${jobRoutes}/${company}/${job}/question/${id}`;
  },
  POSTREVIEW: (company, job) => {
    return `${jobRoutes}/${company}/${job}/review`;
  },
  UPVOTEREVIEW: (company, job, id) => {
    return `${jobRoutes}/${company}/${job}/review/${id}`;
  },
};

export default routes;
