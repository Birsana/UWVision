import axios from "axios";
import routes from "backendActions/routes";

export const addInterviewQuestion = (jobId, interviewQuestion, token) => {
    return axios({
        method: "post",
        url: routes.addInterviewQuestionRoute(),
        data: {
            job: jobId,
            body: interviewQuestion
        },
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
