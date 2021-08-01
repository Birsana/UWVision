import axios from "axios";
import routes from "backendActions/routes";

export const getCompany = (company) => {
  return axios.get(routes.GETCOMPANY(company));
};
