const express = require("express");
const mongoose = require("mongoose");
const Students = require("./models/Students");
const User = require("./models/schema");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

Mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("✅DataBase connected ......")

})
.catch((err)=>{
    console.log("❌ DataBase connection failed........")
})

app.post("/register", async (req,res)=>{
    const {username,password} = req.body;
    try{
        if(!username || !password){
            console.log("username and password both required");
            res.send("please enter username and passoword");
        }
        const hasedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username,password:hasedPassword});
        await newUser.save();
        console.log("user registerd succesfully....")
        res.send("user registered successfully....")

    }
    catch(err){
        console.log("failed to registe");
        res.send("failed to register");
    }
})




