import axios from "axios";
import routes from "backendActions/routes";

export const signUp = (username, email, password) => {
  return axios({
    method: "post",
    url: routes.SIGNUP(),
    data: {
      user: {
        email: email,
        username: username,
        password: password,
      },
    },
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};
