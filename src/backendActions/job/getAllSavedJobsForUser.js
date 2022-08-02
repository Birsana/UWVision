import axios from "axios";
import routes from "backendActions/routes";

export const getAllSavedJobsForUser = (token) => {
    return axios({
        method: "get",
        url: routes.getAllSavedJobsForUser(),
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
