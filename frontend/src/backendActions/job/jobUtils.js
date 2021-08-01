import axios from "axios";
import routes from "backendActions/routes";

const getSalaries = (company, job) => {
  return axios.get(routes.GETSALARIES(company, job));
};

const getQuestions = (company, job, token = null) => {
  let headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return axios({
    method: "get",
    url: routes.GETQUESTIONS(company, job),
    data: {},
    headers,
  });
};

const getReviews = (company, job, token = null) => {
  let headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  return axios({
    method: "get",
    url: routes.GETREVIEWS(company, job),
    data: {},
    headers,
  });
};

const getRatings = (company, job) => {
  return axios.get(routes.GETRATINGS(company, job));
};

const postSalary = (company, job, token, salary) => {
  return axios({
    method: "POST",
    url: routes.POSTSALARY(company, job),
    data: {
      salary: {
        wage: salary,
      },
    },
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

const postQuestion = (company, job, token, question) => {
  return axios({
    method: "POST",
    url: routes.POSTQUESTION(company, job),
    data: {
      question: {
        body: question,
      },
    },
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

const upvoteQuestion = (company, job, id, token) => {
  return axios({
    method: "POST",
    url: routes.UPVOTEQUESTION(company, job, id),
    data: {},
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

const postReview = (company, job, token, review) => {
  return axios({
    method: "POST",
    url: routes.POSTREVIEW(company, job),
    data: {
      review,
    },
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

const upvoteReview = (company, job, id, token) => {
  return axios({
    method: "POST",
    url: routes.UPVOTEREVIEW(company, job, id),
    data: {},
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};

export {
  getSalaries,
  getQuestions,
  getReviews,
  getRatings,
  postSalary,
  postQuestion,
  upvoteQuestion,
  postReview,
  upvoteReview,
};
