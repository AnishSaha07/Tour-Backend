const mongoose = require("mongoose");
 const validator = require("validator");
 const bcrypt = require("bcryptjs");

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail,"Please provide a valid Email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8,"password must be atleast 8 character"],
        maxlength: [15,"password must be atmost 15 character"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "moderator"],
        default: "user"
    }
 });

 

 userSchema.pre("save", async function (next){
    
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    //this.passwordConfirm = undefined;
    next();
 });

 userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
 }

const User = mongoose.model("User", userSchema);
 module.exports = User;