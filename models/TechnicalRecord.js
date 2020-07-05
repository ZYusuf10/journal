var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechnicalPostSchema = new Schema(
  {
    Title: {type: String, required: true, max: 200},
    ImageName: {type: String, required: true, max: 100},
    Caption: {type: String, required: true, max: 100},
    Body: {type: String, required: true, max: 3000}
  }
);

//virtual url
TechnicalPostSchema.virtual('url').get(
  function(){
    return '/Technical/'+this._id;
  }
);

module.exports = mongoose.model('TechnicalPost', TechnicalPostSchema);