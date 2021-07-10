import axios from "axios";
import routes from "backendActions/routes";

export const getCompanyJobData = (company, token) => {
    return axios({
        method: "get",
        url: `${routes.GETCOMPANYJOBDATA}/${company}`,
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
    });
}
