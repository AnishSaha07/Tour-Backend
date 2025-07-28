const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    });


}


exports.signup = catchAsync(async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        //return res.status(400).json({
        //    status:"error",
        //    message:"Missing required fields"    
        //});
        // return next(new AppError("Missing required fields", 400));
        return next(new AppError("Missing required fields", 400));
    }
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return next(new AppError("User already exists", 400));
    }

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        
    }); // for creating a new user in the database 

    createSendToken(newUser, 201, res);
    // res.status(201).json({
    //     status:"success",
    //     date: newUser
    // });

});



exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body; // object destructuring

    if (!email || !password) {
        return next(new AppError("Missing required fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    const isPasswordCorrect = await user.correctPassword(password, user.password);

    if (!isPasswordCorrect) {
        return next(new AppError("Invalid password", 401));
    }

    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError("User not found", 404));
    }

    req.user = currentUser;
    next();

});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You are not authorized to access this resource", 403));
        }
        next();
    }
}


