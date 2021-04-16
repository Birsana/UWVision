var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
  body: String,
  author: String,
  job: String,
  company: String
}, {timestamps: true});

// Requires population of author
ThreadSchema.methods.toJSONFor = function(){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author
  };
};

mongoose.model('Thread', ThreadSchema);