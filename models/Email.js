var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema(
  {
    Email: {type: String, required: true, max: 200}
  }
);

//virtual url
EmailSchema.virtual('url').get(
  function(){
    return '/Email/'+this._id;
  }
);

module.exports = mongoose.model('Email', EmailSchema);