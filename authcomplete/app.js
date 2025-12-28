const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/create', function (req, res) {
    let { username, email, password, age } = req.body;
    bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {

            let createdUser = await userModel.create({ username, email, password: hash, age });
           let token =  jwt.sign({email},'shatokenhere'); 
            res.cookie('token',token); 
            res.send(createdUser);
        });
    })
    
});

app.get('/login', function (req, res) {
      res.render('login');
    });

    app.post('/login', async function (req, res) {
        let user = await userModel.findOne({email:req.body.email}); 
        if(!user){
            return res.send('Something went wrong'); 
        }
        console.log(req.body.password,user.password);
        let isMatched = await bcrypt.compare(req.body.password,user.password); 
        if(isMatched){
            let token = jwt.sign({email:user.email},'shatokenhere'); 
            res.cookie('token',token); 
            res.send('Logged In Successfully'); 
        }else{
            res.send('Something went wrong');
    }
}); 

app.get('/logout',function(req,res){
    res.clearCookie('token'); 
    res.redirect('/'); 
});


app.listen(3000); 