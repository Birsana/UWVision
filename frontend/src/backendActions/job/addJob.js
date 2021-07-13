import axios from "axios";
import routes from "backendActions/routes";

export const addJob = (company, job, token) => {
    return axios({
        method: "post",
        url: routes.ADDJOBTOCOMPANY(company),
        data: {
            job: {
                jobName: job
            }
        },
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
    });
}