const express = require('express');
const app = express();
const userModel = require('./usermodel');
app.get('/', (req, res) => {
    res.send('Hello World');
});
//CREATE
app.get('/create', async (req, res) => {
   let createduser =  await  userModel.create({      // asynchrounous function
        name: "Aari",
        username: "Aari123",
        email: "malviyaaadarsh45@gmail.com"
      })
      res.send(createduser);
});
//UPDATE    
app.get('/update', async (req, res) => {
   let updateduser =  await  userModel.findOneAndUpdate({username:"Aari123"},{name:"Aari Malviya"},{new:true})  
      res.send(updateduser);
});
//READ
app.get('/read', async (req, res) => {
   let readusers =  await  userModel.find({username:"Aari123"})  
      res.send(readusers);
});
// DELETE
app.get('/delete', async (req, res) => {
   let deleteduser =  await  userModel.findOneAndDelete({username:"Aari123"})  
      res.send(deleteduser);
});

app.listen(3000) ; 