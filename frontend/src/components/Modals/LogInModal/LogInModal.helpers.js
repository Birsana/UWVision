import axios from 'axios';

// POST Request to Sign-In
export const signIn = (email, password) => {
    let signInURL = `http://localhost:5000/auth/users/login`

    return axios({
        method: "post",
        url: signInURL,
        data: {
          user: {
              "email": email,
              "password": password
          } 
        },
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
}