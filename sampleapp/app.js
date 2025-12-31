const express = require('express');
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const upload = require('./config/multerconfig');
const bcrypt = require('bcrypt');  
const jwt =  require('jsonwebtoken');    
// const multer = require('multer');
// const crypto = require('crypto');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine','ejs');   
app.use(express.static(path.join(__dirname, 'public')));         
app.use(express.json());    
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images/uploads/')
//     },
//     filename: function (req, file, cb) {
//       crypto.randomBytes(12, function(err, bytes) {
//         const fn = bytes.toString('hex') + path.extname(file.originalname);  
//         cb(null, fn);
//        //  cb(null, file.fieldname + '-' + uniqueSuffix) // from template
//       }); 
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // `from template`
       
//     }
//   })
  
// const upload = multer({ storage: storage });

app.get('/',function(req,res){
   res.render('index');
});
app.get('/profile/uploadimg',function(req,res){
   res.render('profileupload');
});
app.post('/upload',isLoggedIn, upload.single('image'), async function(req,res){
    let user = await userModel.findOne({email:req.user.email});  
        user.profileimg = req.file.filename;
        await user.save();
        res.redirect('/profile');
    
});

app.post('/register',async function(req,res){
    let {email, password, username, name, age} = req.body;
    let user= await userModel.findOne({email});
    if(user){return res.status(500).send('User already registered');}
    bcrypt.genSalt(10, function(err, salt) {    
        bcrypt.hash(password, salt, async function(err, hash) {
            let user = await userModel.create({username,name,age,email,password: hash});
            let token = jwt.sign({email:email,userid:user._id},'zxcvbnm'); 
            res.cookie('token',token);
            res.send('User registered successfully');
        });
    });
});

// app.get('/test', function(req,res){    
//    res.render('test');
// }); 

// app.post('/upload',upload.single('image'), function(req,res){    
//     res.send(req.file);
// });



app.get('/login',async function(req,res){
    res.render('login');
});
app.get('/logout',async function(req,res){
    res.clearCookie('token');
    res.render('login');
});
app.post('/login',async function(req,res){
    let {email, password} = req.body;
    let user= await userModel.findOne({email});
    if(!user){return res.status(500).send('Something went wrong');}
    bcrypt.compare(password, user.password, function(err, result) {
        if(result===true){
            let token = jwt.sign({email:email,userid:user._id},'zxcvbnm'); 
            res.cookie('token',token);
            res.redirect('/profile');
        }else{
            res.status(500).send('Something went wrong');
        }               
    });
});

function isLoggedIn(req,res,next){
    let token = req.cookies.token;
    if(!token){res.render('login');}
    else {
        let data = jwt.verify(token,'zxcvbnm'); 
        req.user = data;
    }
    next(); }; 
   

 app.get('/profile',isLoggedIn,async function(req,res){    // protected route
    let user = await userModel.findOne({email:req.user.email}).populate('posts');
    res.render('profile',{user:user});
});

app.post('/post',isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email}); 
    let post = await postModel.create({user:user._id,content:req.body.content});    
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});     

app.get('/like/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOne({_id:req.params.id}).populate('user');

    if(post.likes.indexOf(req.user.userid)=== -1){
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    await post.save();
    res.redirect('/profile');
});

app.get('/edit/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOne({_id:req.params.id}).populate('user');
    res.render('editpost',{post:post});
});

app.post('/update/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content: req.body.content});
    res.redirect('/profile');
});



app.listen(3000); 


