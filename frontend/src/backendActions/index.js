// User API actions:
export * from "./user/logIn";

// Company API actions
export * from "./company/getAllCompanies";
export * from "./company/addCompany";
export * from "./company/getCompany";

// Job API actions: 
export * from "./job/getAllJobsForCompany";
export * from "./job/getAllSavedJobsForUser";
export * from "./job/saveJob";
export * from "./job/getJob";
export * from "./job/addJob";

// Salary API actions: 
export * from "./salary/getAllSalariesForJob";
export * from "./salary/addSalary";

// Review API actions: 
export * from "./review/getAllReviewsForJob";
export * from "./review/upvoteReview";
export * from "./review/addReview";

// Interview Question API actions: 
export * from "./interviewQuestion/getAllInterviewQuestionsForJob";
export * from "./interviewQuestion/upvoteInterviewQuestion";
export * from "./interviewQuestion/addInterviewQuestion";



// === STUFF TO REPLACE LATER ===
export * from "./user/isUserConfirmed";
export * from "./user/resetPassword";
export * from "./user/sendResetEmail";
export * from "./user/signUp";
