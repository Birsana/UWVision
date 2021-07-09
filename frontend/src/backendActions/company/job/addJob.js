import axios from "axios";
import routes from "backendActions/routes";

export const addJob = (company, job, token) => {
    let URL = `${routes.SERVER}/data/${company}/addjob`;
    return axios({
        method: "post",
        url: URL,
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