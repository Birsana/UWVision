import axios from 'axios';

// POST Request to create new user
export const signUp = (username, email, password) => {
  let signUpURL = "http://localhost:5000/auth/users";

  return axios({
    method: "post",
    url: signUpURL,
    data: {
      user: {
          "email": email,
          "username": username,
          "password": password
      } 
    },
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
};