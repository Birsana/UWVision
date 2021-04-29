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
export const addCompany = (companyToAdd) => {
  let addURL = "http://localhost:5000/data/addCompany";

  //TODO: Replace authorization token with user credentials
  axios({
    method: "post",
    url: addURL,
    data: {
      company_name: companyToAdd,
    },
    headers: {
      "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODlmMGI4ZTZlZTdmNTdmMDE4Y2NiMSIsInVzZXJuYW1lIjoiY3lydXNnYW5kZXZpYSIsImV4cCI6MTYzMDAyMDc5MiwiaWF0IjoxNjE5NjUyNzkyfQ.4qOOLM8g6XZdRrekxua2wG4khFlwgw4spAEXFdbtKRo",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
};
