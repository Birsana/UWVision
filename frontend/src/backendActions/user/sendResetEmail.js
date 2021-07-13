import axios from "axios"
import routes from "backendActions/routes"

export const sendResetEmail = (resetEmail) => {
    return axios({
        method: "post",
        url: routes.SENDRESETEMAIL(),
        data: {
            email: resetEmail
        },
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
    });
}
