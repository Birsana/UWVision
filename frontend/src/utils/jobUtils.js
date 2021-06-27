const askQuestion = (company, job, question) => {
  const request = `http://localhost:5000/data/company/${company}`
  return axios.get(request)
    .then((response) => {
      setCompanyData(response.data)
      setIsCompanyValid(true);
    })
    .catch((error) => {
      setIsCompanyValid(false);
    })
}

const upvoteQuestion = async(company, job, question) => {

}

const getQuestions = async(company, job) => {

}

const addSalary = async(company, job, salary) => {

}

const getSalaries = async(company, job) => {

}

const addReview = async(company, job, review) => {

}

const upvoteReview = async(company, job, review) => {

}

const getReviews = async(company, job) => {

}

const getRatingAndNumReviews = async(company, job) => {

}

const saveJob = async(company, job) => {

}

const getSavedJobs = async(company, job) => {

}

export { 
  askQuestion,
  upvoteQuestion,
  getQuestions,
  addSalary,
  getSalaries,
  addReview,
  upvoteReview,
  getReviews,
  getRatingAndNumReviews,
  saveJob,
  getSavedJobs
}