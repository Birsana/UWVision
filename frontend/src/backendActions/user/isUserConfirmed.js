import axios from "axios";
import routes from "backendActions/routes";

export const isUserConfirmed = (username) => {
  let isConfirmedURL = `${routes.ISEMAILCONFIRMED}/${username}`;
  return axios.get(isConfirmedURL);
};
