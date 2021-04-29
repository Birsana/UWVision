var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
    body: String,
    author: String,
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }
  }, {timestamps: true});

ReplySchema.methods.toJSONFor = function(){
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author
    };
};


  mongoose.model('Reply', ReplySchema);