var mongoose = require('mongoose');

var InterviewQuestionSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  }, {timestamps: true});

// to get json for a specific interview question
InterviewQuestionSchema.methods.toJSONFor = function(isUpvoted){
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author,
      numUpvoters: this.upvoters.length,
      upvoted: isUpvoted
    };
};

  mongoose.model('InterviewQuestion', InterviewQuestionSchema);