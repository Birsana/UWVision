import axios from "axios";
import routes from "backendActions/routes";

export const getListOfCompanies = () => {
  return axios.get(routes.COMPANYDATA).then(response => {
    let data = response.data;
    const companies = [];

    data.forEach(company => {
      companies.push(company.company_name);
    });

    companies.sort();

    return companies;
  });
};
