import axios from "axios";
import routes from "backendActions/routes";

export const getAllJobsForCompany = (companyName, token=null) => {
  let headers = {};
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return axios({
    method: "get",
    url: routes.getAllJobsForCompanyRoute(companyName),
    headers: headers
  });
};
