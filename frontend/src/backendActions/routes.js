const server = "https://uwvision.herokuapp.com"; //keep as localhost for local testing
// const server = "http://localhost:5000";

const companyRoutes = `${server}/data`;
const userRoutes = `${server}/auth`;
const jobRoutes = `${server}/job`;

const routes = {
  SERVER: server,

  // Company Routes:
  ADDCOMPANY: `${companyRoutes}/addcompany`,
  COMPANYDATA: `${companyRoutes}/companydata`,
  GETCOMPANY: `${companyRoutes}/company`,
  GETCOMPANYJOBDATA: `${companyRoutes}/getcompanydata`,

  // User Routes:
  LOGIN: `${userRoutes}/users/login`,
  SIGNUP: `${userRoutes}/users`,
  ISEMAILCONFIRMED: `${userRoutes}/isconfirmed`,
  SENDRESETEMAIL: `${userRoutes}/sendresetemail`,
  RESETPASSWORD: `${userRoutes}/forgotpassword`,

  //Job Routes:
  GETSALARIES: (company, job) => { return `${jobRoutes}/${company}/${job}/salaries` },
  GETQUESTIONS: (company, job) => { return `${jobRoutes}/${company}/${job}/questions` },
  GETREVIEWS: (company, job) => { return `${jobRoutes}/${company}/${job}/reviews` },
  GETRATINGS: (company, job) => { return `${jobRoutes}/${company}/${job}/rating` },
  POSTSALARY: (company, job) => { return `${jobRoutes}/${company}/${job}/salary` },
  POSTQUESTION: (company, job) => { return `${jobRoutes}/${company}/${job}/question` },
  UPVOTEQUESTION: (company, job, id) => {return `${jobRoutes}/${company}/${job}/question/${id}`},
  POSTREVIEW: (company, job) => { return `${jobRoutes}/${company}/${job}/review` },
  UPVOTEREVIEW: (company, job, id) => { return `${jobRoutes}/${company}/${job}/review/${id}`}
};

export default routes;
