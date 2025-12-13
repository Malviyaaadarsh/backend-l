const fs = require('fs');
fs.writeFile('example.txt','hey , how are you?',function(err){
    if(err) console.log(err);
    console.log('File created and data written successfully');})
fs.appendFile('example.txt',' I am fine, thank you!',function(err){
    if(err) console.log(err);
    console.log('Data appended successfully');})
fs.rename('example.txt','newExample.txt',function(err){
    if(err) console.log(err);
    console.log('File renamed successfully');})
fs.copyFile('newExample.txt','copyOfExample.txt',function(err){
    if(err) console.log(err);
    console.log('File copied successfully');})
fs.unlink('copyOfExample.txt',function(err){
    if(err) console.log(err);
    console.log('File deleted successfully');})    
fs.rmdir('./copy',{recursive:true},function(err){
    if(err) console.log(err);
    console.log('Directory deleted successfully');})    
fs.readFile('newExample.txt','utf8',function(err,data){
    if(err) console.log(err);
    console.log('File read successfully. Content: '+data);})    