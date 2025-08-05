const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/schema");
const bcrypt = require("bcrypt");
require("dotenv").config({path:"./config/.env"});

const app = express();

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("✅DataBase connected ......")

})
.catch((err)=>{
    console.log("❌ DataBase connection failed.........",err)
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // 👉 Check if both username and password are provided
    if (!username || !password) {
        console.log("Username and password are required")
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Optional: Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already taken.....")
            return res.status(409).json({ error: "Username already taken" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hash });
        await newUser.save();
        console.log("User registerd successfully.........")
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password){
        
        res.status(400).json({ error: "Username and password required" });
    }

    const user = await User.findOne({ username });
    if (!user){
        console.log("Invalid credentials")
        res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        console.log("Invalid credentials")
        res.status(401).json({ error: "Invalid credentials" });
    }else{
        console.log("Login successful")
        res.status(200).json({ message: "Login successful" });
    }

});
app.get("/data",async (req,res) =>{
    const data = await User.find()
    res.json(data)
})
app.listen(port, () =>{
    console.log("SERVER IS RUNNING.........🚀")
})



