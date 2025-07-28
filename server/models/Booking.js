const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // this is the user who is booking the tour
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    }
})

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;