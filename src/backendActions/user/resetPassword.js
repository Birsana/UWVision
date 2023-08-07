import axios from "axios";
import routes from "backendActions/routes";

export const resetPassword = (newPassword, resetToken) => {
  return axios({
    method: "post",
    url: routes.RESETPASSWORD(resetToken),
    data: {
      password: newPassword,
    },
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
};
