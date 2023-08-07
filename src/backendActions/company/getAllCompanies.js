import axios from "axios";
import routes from "backendActions/routes";

export const getAllCompanies = () => {
  return axios.get(routes.getAllCompaniesRoute());
};
