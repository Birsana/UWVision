import axios from "axios";
import routes from "backendActions/routes";

export const getJob = (companyName, jobName) => {
    return axios({
        method: "get",
        url: routes.getJobRoute(companyName, jobName)
    });
};
