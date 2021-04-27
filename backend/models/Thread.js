var mongoose = require('mongoose');
var slug = require('slug');

var ThreadSchema = new mongoose.Schema({
  body: String,
  title: String,
  author: String,
  job: String,
  company: String,
  slug: {type: String, lowercase: true, unique: true}
}, {timestamps: true});

// Requires population of author
ThreadSchema.methods.toJSONFor = function(){
  return {
    id: this._id,
    body: this.body,
    slug: this.slug,
    createdAt: this.createdAt,
    author: this.author
  };
};

ThreadSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
  
    next();
});

ThreadSchema.methods.slugify = function(){
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
}

mongoose.model('Thread', ThreadSchema);