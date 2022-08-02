import axios from "axios";
import routes from "backendActions/routes";

export const addCompany = (companyName, token) => {
  return axios({
    method: "post",
    url: routes.addCompanyRoute(),
    data: {
      name: companyName,
    },
    headers: {
      Authorization: `Token ${token}`
    },
  });
};
