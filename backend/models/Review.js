var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    body: String,
    author: String,
    workLifeBalance: Number,
    culture: Number,
    interestingWork: Number,
    overallRating: Number,
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  }, {timestamps: true});


// to get json for a specific reply
ReviewSchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author,
      workLife: this.workLifeBalance,
      interestingWork: this.interestingWork,
      Culture: this.culture
    };
};


  mongoose.model('Review', ReviewSchema);