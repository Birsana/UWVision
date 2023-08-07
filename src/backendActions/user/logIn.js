import axios from "axios";
import routes from "backendActions/routes";

export const logIn = (username, password) => {
  return axios({
    method: "post",
    url: routes.logInRoute(),
    data: {
      username: username,
      password: password,
    }
  });
};
