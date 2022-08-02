import axios from "axios";
import routes from "backendActions/routes";

export const getAllSalariesForJob = (jobId) => {
    return axios({
        method: "get",
        url: routes.getAllSalariesForJobRoute(jobId),
    });
};
