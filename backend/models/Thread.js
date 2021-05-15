var mongoose = require('mongoose');
var slug = require('slug');

var ThreadSchema = new mongoose.Schema({
  body: String,
  title: String,
  author: String,
  job: String,
  company: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  slug: {type: String, lowercase: true, unique: true}
}, {timestamps: true});

// to get json for a specific thread
ThreadSchema.methods.toJSONFor = function(){
  return {
    id: this._id,
    title: this.title,
    body: this.body,
    slug: this.slug,
    createdAt: this.createdAt,
    author: this.author
  };
};

//will add a slug when a thread is created
ThreadSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
  
    next();
});

//create the slug
ThreadSchema.methods.slugify = function(){
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
}

mongoose.model('Thread', ThreadSchema);