import axios from "axios";
import routes from "backendActions/routes";

export const upvoteInterviewQuestion = (interviewQuestionId, token) => {
    return axios({
        method: "post",
        url: routes.upvoteInterviewQuestionRoute(),
        data: {
            interview_question: interviewQuestionId
        },
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
