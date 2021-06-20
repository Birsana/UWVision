const server = `http://localhost:5000`;

const companyRoutes = `${server}/data`;
const userRoutes = `${server}/auth`;
const jobRoutes = `${server}/job`;

const routes = {
  SERVER: server,

  // Company Routes:
  ADDCOMPANY: `${companyRoutes}/addCompany`,
  COMPANYDATA: `${companyRoutes}/companyData`,

  // User Routes:
  LOGIN: `${userRoutes}/users/login`,
  SIGNUP: `${userRoutes}/users`,
  ISEMAILCONFIRMED: `${userRoutes}/isConfirmed`,

  //Job Routes:
  

};

export default routes;