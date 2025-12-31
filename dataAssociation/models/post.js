const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    postdata: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
     Date: {
        type: Date,
        default: Date.now
     }
});
module.exports = mongoose.model('post', postSchema);

