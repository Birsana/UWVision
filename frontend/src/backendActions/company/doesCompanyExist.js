import axios from "axios";
import routes from "backendActions/routes";

export const doesCompanyExist = (companyToAdd) => {
  return axios.get(routes.COMPANYDATA).then((response) => {
    let companyList = [];
    response.data.forEach((element) => {
      companyList.push(element.companyName.toLowerCase());
    });

    return companyList.includes(companyToAdd.toLowerCase());
  });
};
