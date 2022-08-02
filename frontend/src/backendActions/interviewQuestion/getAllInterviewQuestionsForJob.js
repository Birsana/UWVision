import axios from "axios";
import routes from "backendActions/routes";

export const getAllInterviewQuestionsForJob = (jobId, token=null) => {
    let headers = {};
    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    return axios({
        method: "get",
        url: routes.getAllInterviewQuestionsForJobRoute(jobId),
        headers: headers
    });
};
