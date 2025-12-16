const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/', function(req, res){
  res.render("index");
});
app.get('/profile/:user', function(req, res){     
     req.params.user
    res.send("Welcome " + req.params.user );
});
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});


