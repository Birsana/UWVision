import axios from "axios";
import routes from "backendActions/routes";

export const addSalary = (jobId, hourly_wage, token) => {
    return axios({
        method: "post",
        url: routes.addSalaryRoute(),
        data: {
            job: jobId,
            hourly_wage: hourly_wage
        },
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
