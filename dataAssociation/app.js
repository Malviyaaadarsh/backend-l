const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');
const app = express() ; 
app.get('/', function(req, res){
    res.send('Hello World');
});
app.get('/create', async function(req, res){
   let user = await  userModel.create({
        username: 'Aari',
        age: 20 , 
        email: 'a@gmail.com',
});
res.send(user);
}); 
app.get('/post/create', async function(req, res){
    let post = await  postModel.create({
        postdata: 'This is my first post',
        user: '69526f2786d8e27e706f9ab9',
});
let  user = await userModel.findOne({_id: '69526f2786d8e27e706f9ab9'});
       user.posts.push(post._id);
       await user.save();
res.send({post,user});
}); 
app.listen(3000); 