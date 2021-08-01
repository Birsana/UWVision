import axios from "axios";
import routes from "backendActions/routes";

export const saveJobToUser = (company, job, token) => {
  axios({
    method: "post",
    url: routes.SAVEJOBTOUSER(company, job),
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};
