import axios from "axios";
import routes from "backendActions/routes";

export const logIn = (email, password) => {
  return axios({
    method: "post",
    url: routes.LOGIN(),
    data: {
      user: {
        email: email,
        password: password,
      },
    },
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};
