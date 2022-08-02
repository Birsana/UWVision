import axios from "axios";
import routes from "backendActions/routes";

export const getAllReviewsForJob = (jobId, token=null) => {
    let headers = {};
    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    return axios({
        method: "get",
        url: routes.getAllReviewsForJobRoute(jobId),
        headers: headers
    });
};
