const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var admin = require("firebase-admin");
var cookieParser = require('cookie-parser');

var serviceAccount = require("./serviceaccount.json");
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(cookieParser());

app.get("/api/test", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/classInfo", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/queuePublic", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/queue", (req, res) => {
    res.send("Hello World!");
});

app.delete("/api/queueUser", (req, res) => {
    res.send("Hello World!");
});

app.delete("/api/queueClear", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/auth", (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {

        let options = {
            maxAge: 1000 * 60 * 60 // would expire after 15 minutes
        }

        console.log(JSON.parse(data));
    
      if(JSON.parse(data).Token!=null||JSON.parse(data).Token!=undefined){
            res.cookie('token', JSON.parse(data).Token, options);
      }
      else{
        console.log("clearing cookie");
        res.clearCookie("token");
      }        
    
        res.end('updated user token');
    })
});

app.post("/api/queueUser", (req, res) => {
    res.send("Hello World!");
});

app.get('*', function(req, res){
    res.end('No get pathway found.');  
});

app.post('*', function(req, res){
    res.end('No post pathway found.');  
});

app.put('*', (req,res)=>{
    res.end('No put pathway found.');  
})

app.delete('*', (req,res)=>{
    res.end('No delete pathway found.');  
})

app.listen(port, () => console.log(`Listening on port ${port}`));