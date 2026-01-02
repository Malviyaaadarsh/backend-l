const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bagshop'); 
const userSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
},
email: { type: String, unique: true },
password:String,
cart: {
    type: Array,
    default: []
},
isadmin : Boolean,
orders: {
    type: Array,
    default: []
},
contact:Number,
picture:String,
});

module.exports = mongoose.model('User', userSchema);