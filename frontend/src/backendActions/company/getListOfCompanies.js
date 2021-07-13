import axios from "axios";
import routes from "backendActions/routes";

export const getListOfCompanies = () => {
  return axios.get(routes.GETCOMPANYLIST()).then(response => {
    let data = response.data;
    const companies = [];

    data.forEach(company => {
      companies.push(company.companyName);
    });

    companies.sort();

    return companies;
  });
};
