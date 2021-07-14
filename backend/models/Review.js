var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    body: String,
    author: String,
    year: {type: Number, min: 2000, max: Date().getFullYear()},
    term: {type: String, enum: ['fall', 'winter', 'spring']},
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
      year: this.year,
      term: this.term,
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