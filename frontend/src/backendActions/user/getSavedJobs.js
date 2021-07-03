import axios from "axios"
import routes from "backendActions/routes"

export const getSavedJobs = (token) => {
    return axios({
        method: "get",
        url: `${routes.SERVER}/job/savedjobs`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
    })
}
