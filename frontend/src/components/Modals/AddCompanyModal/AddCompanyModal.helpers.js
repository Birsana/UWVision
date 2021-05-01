import axios from 'axios';

// Validation Helper Function
export const doesCompanyAlreadyExist = (companyToAdd) => {
    const companyDataURL = "http://localhost:5000/data/companyData";

    return axios.get(companyDataURL).then(response => {
        let companyList = [];
        response.data.forEach(element => {
            companyList.push((element.company_name).toLowerCase());
        })

        return companyList.includes(companyToAdd.toLowerCase());
    })
}

// POST Request to add new company
export const addCompany = (companyToAdd, token) => {
  let addURL = "http://localhost:5000/data/addCompany";

  axios({
    method: "post",
    url: addURL,
    data: {
      company_name: companyToAdd,
    },
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
};
