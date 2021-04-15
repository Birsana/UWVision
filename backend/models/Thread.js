var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  job: String,
  company: String
}, {timestamps: true});

// Requires population of author
ThreadSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Thread', ThreadSchema);