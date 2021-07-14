import axios from "axios";
import routes from "backendActions/routes";

export const getListOfCompanies = () => {
  return axios.get(routes.GETCOMPANYLIST());
};
