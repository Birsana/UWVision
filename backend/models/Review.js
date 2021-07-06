var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    body: String,
    author: String,
    workLifeBalance: Number,
    culture: Number,
    interestingWork: Number,
    overallRating: Number,
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  }, {timestamps: true});


// to get json for a specific reply
ReviewSchema.methods.toJSONFor = function(isUpvoted){
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author,
      workLifeBalance: this.workLifeBalance,
      interestingWork: this.interestingWork,
      culture: this.culture,
      upvoted: isUpvoted,
      numUpvotes: this.upvoters.length
    };
};


  mongoose.model('Review', ReviewSchema);