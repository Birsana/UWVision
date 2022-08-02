import axios from "axios";
import routes from "backendActions/routes";

export const upvoteReview = (reviewId, token) => {
    return axios({
        method: "post",
        url: routes.upvoteReviewRoute(),
        data: {
            review: reviewId
        },
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
