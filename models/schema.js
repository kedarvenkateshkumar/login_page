const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username:{type:String, require:true, unique:true},
    password:{type:String, require:true}

})



const Users = mongoose.model("RECEVED",UserSchema);

module.exports = Users