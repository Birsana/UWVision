import axios from "axios";
import routes from "backendActions/routes";

export const getCompany = (companyName) => {
  return axios.get(routes.getCompanyRoute(companyName));
};
