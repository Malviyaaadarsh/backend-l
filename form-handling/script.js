const express = require('express');
const app = express();

express.use(express.json());
express.urlencoded({ extended: true });

app.use(function(req,res,next){
    console.log('A new request received ');
    next(); 
}); 

// creating bsic routes 
app.get('/', function(req, res){
res.send('Welcomeeeeeeee to the Home Page')
})
app.get('/Profile', function(req, res){
    res.send('Welcomeeeeeeee to the Profile Page')
})
app.get('/About', function(req, res){
    return next(new Error('Something went wrong!'));
})
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000); 
