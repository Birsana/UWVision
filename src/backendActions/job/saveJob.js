import axios from "axios";
import routes from "backendActions/routes";

export const saveJob = (jobId, token) => {
    return axios({
        method: "post",
        url: routes.saveJobRoute(),
        data: {
          job: jobId,
        },
        headers: {
          Authorization: `Token ${token}`
        },
      });
}
