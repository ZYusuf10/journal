var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReflectionSchema = new Schema(
  {
    Reflection: {type: Object, blackbox: true }
  }
);

//virtual url
ReflectionSchema.virtual('url').get(
  function(){
    return '/Reflection/'+this._id;
  }
);

module.exports = mongoose.model('Reflection', ReflectionSchema);