const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bagshop')
.then(function(){
    console.log("Mongoose connected successfully");
})
.catch(function(err){
    console.log("Mongoose connection failed" + err);
}); 

module.exports = mongoose.connection;






















