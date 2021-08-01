const server =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://uwvision.herokuapp.com";

const companyRoutes = `${server}/data`;
const userRoutes = `${server}/auth`;
const jobRoutes = `${server}/job`;

const routes = {
  // Company Routes:
  GETCOMPANYLIST: () => {
    return `${companyRoutes}/companydata`;
  },
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
