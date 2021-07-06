import axios from "axios";
import routes from "backendActions/routes";

export const addCompany = (companyToAdd, token) => {
  axios({
    method: "post",
    url: routes.ADDCOMPANY,
    data: {
      companyName: companyToAdd
    },
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};
