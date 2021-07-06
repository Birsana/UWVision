import axios from "axios";
import routes from "backendActions/routes";

export const getSalaries = (company, token) => {
  axios({
    method: "get",
    url: routes.GETSALARIES,
    data: {
      company_name: companyToAdd
    },
  });
};
