const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingDate:{
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        require:true
    },
    dentist:{
        type:mongoose.Schema.ObjectId,
        ref:'Dentist', 
        required:true 
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking',BookingSchema);