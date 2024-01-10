const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Register = require("./models/registers");
const Query = require("./models/queries");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

require("./db/conn");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

// console.log(path.join(__dirname, "../public"));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/register", async (req, res)=>{
    try{
        const registerUser = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const registered = await registerUser.save();
        res.status(201).redirect("/Home.html");
    } catch(e){
        res.send(400).send(e);
    }
});

app.post("/login", async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({email:email});
        if(user.password === password){
            res.status(201).redirect("/Home.html");
        }else{
            res.send("password incorrect");
        }

    } catch(e){
        res.send(400).send(e);
    }
});

app.post("/query", async (req, res)=>{
    try{
        const userQuery = new Query({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        const querysubmit = await userQuery.save();
        res.status(201).redirect("/");
    } catch(e){
        res.send(400).send(e);
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});