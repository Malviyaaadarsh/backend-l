const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
},
email: { type: String, unique: true },
password:String,

products: {
    type: Array,
    default: []
},
gstin:String,
picture:String,
});

module.exports = mongoose.model('Owner', ownerSchema);
