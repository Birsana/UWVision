const server = `http://localhost:5000`;

const companyRoutes = `${server}/data`;
const userRoutes = `${server}/auth`;

const routes = {
  // Company Routes:
  ADDCOMPANY: `${companyRoutes}/addCompany`,
  COMPANYDATA: `${companyRoutes}/companyData`,

  // User Routes:
  LOGIN: `${userRoutes}/users/login`,
  SIGNUP: `${userRoutes}/users`,
  ISEMAILCONFIRMED: `${userRoutes}/isConfirmed`,
};

export default routes;
