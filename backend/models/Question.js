var mongoose = require('mongoose');

var InterviewQuestionSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvote: Number,
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  }, {timestamps: true});

InterviewQuestionSchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author
    };
};

  mongoose.model('InterviewQuestion', InterviewQuestionSchema);