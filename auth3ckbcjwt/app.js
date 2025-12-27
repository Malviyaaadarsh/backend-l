const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cookieParser());
app.get('/', function(req, res){
    // res.cookie('name','tina'); 
    // res.send('done'); 


     let token = jwt.sign({ email:'zxcvbnm@gmail.com'},"secretstring"); 
        res.cookie('token', token); res.send('done');
});
app.get('/verify', function(req, res){
    let token = req.cookies.token;
    jwt.verify(token, 'secretstring', function(err, decoded) {
        res.send(decoded);
    });
});

app.get('/read', function(req, res){
    // res.send('read Page'); 
    res.send(req.cookies);
});
app.get('/bcrypt', function(req, res){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('tina', salt, function(err, hash) {
            res.send(hash);
        });
});
}); 
app.get('/compare', function(req, res){
    bcrypt.compare('tina', '$2b$10$gH6QECxAUZDutdlys3qXS.G29mui2GAi3TklW9k0evzZ1YfvXLUjK', function(err, result) {
        res.send(result);
    });
});


     


app.listen(3000);









