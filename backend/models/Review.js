var mongoose = require('mongoose');

function validator(year){
    var date = new Date()
    if(year < 2000 || year > date.getFullYear){
        return false;
    } else {
        return true;
    }
}

var ReviewSchema = new mongoose.Schema({
    body: String,
    author: String,
    year: {type: Number, validate: validator},
    term: {type: String, enum: ['fall', 'winter', 'spring']},
    workLifeBalance: {type: Number, min: 1, max: 5},
    culture: {type: Number, min: 1, max: 5},
    interestingWork: {type: Number, min: 1, max: 5},
    overallRating: {type: Number, min: 1, max: 5},
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