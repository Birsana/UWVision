import axios from "axios";
import routes from "backendActions/routes";

export const addJob = (company_id, jobName, token) => {
  return axios({
    method: "post",
    url: routes.addJobRoute(),
    data: {
      company: company_id,
      name: jobName 
    },
    headers: {
      Authorization: `Token ${token}`
    },
  });
};
