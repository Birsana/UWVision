// const server = "https://uwvision.herokuapp.com"; //keep as localhost for local testing
const server = "http://localhost:5000";

const companyRoutes = `${server}/data`;
const userRoutes = `${server}/auth`;
const jobRoutes = `${server}/job`;

const routes = {
  SERVER: server,

  // Company Routes:
  ADDCOMPANY: `${companyRoutes}/addcompany`,
  COMPANYDATA: `${companyRoutes}/companydata`,

  // User Routes:
  LOGIN: `${userRoutes}/users/login`,
  SIGNUP: `${userRoutes}/users`,
  ISEMAILCONFIRMED: `${userRoutes}/isconfirmed`,

  //Job Routes:
  

};

export default routes;