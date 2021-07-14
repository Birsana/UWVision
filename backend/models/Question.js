var mongoose = require('mongoose');



var InterviewQuestionSchema = new mongoose.Schema({
    body: String,
    author: String,
    year: {type: Number, min: 2000, max: Date().getFullYear()},
    term: {type: String, enum: ['fall', 'winter', 'spring']},
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
      year: this.year,
      term: this.term,
      numUpvotes: this.upvoters.length,
      upvoted: isUpvoted
    };
};

  mongoose.model('InterviewQuestion', InterviewQuestionSchema);