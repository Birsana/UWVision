import axios from "axios";
import routes from "backendActions/routes";

export const isUserConfirmed = (username) => {
  return axios.get(routes.ISEMAILCONFIRMED(username));
};
