import axios from "axios";
import routes from "backendActions/routes";

export const addReview = (jobId, review, token) => {
    return axios({
        method: "post",
        url: routes.addReviewRoute(),
        data: {
            job: jobId,
            body: review.body,
            work_life_balance: review.workLifeBalance,
            culture: review.culture,
            interesting_work: review.interestingWork,
            overall_rating: review.overallRating,
            year_worked: review.year,
            term_worked: review.term
        },
        headers: {
            Authorization: `Token ${token}`
        }
    });
};
