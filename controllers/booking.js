const Booking = require('../models/Booking');
const Dentist = require('../models/Dentist');

exports.getBookings = async (req,res,next)=>{
    let query;

    if(req.user.role !== 'admin'){
        query = Booking.find({user:req.user.id}).populate({
            path:'dentist',
            select: 'name'
        });
    } else {
        query = Booking.find().populate({
            path: 'dentist',
            select: 'name',
        })
    }
    try {
        const bookings = await query;

        res.status(200).json({
            success:true,
            count:bookings.length,
            data: bookings
        }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,messag:"Cannot find Appointment"});
    }
};

exports.getBooking = async (req,res,next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path:'booking',
            select: 'name'
        });

        if(!booking){
            return res.status(404).json({success:false,message:`No booking with the id of ${req.params.id}`});
        }

        res.status(200).json({
            success:true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot find Booking"});
    }
};

exports.addBooking = async (req,res,next) => {
    try {
        req.body.dentist=req.params.dentistId;

        const dentist = await Dentist.findById(req.params.dentistId);
        
        if(!dentist){
            return res.status(404).json({success:false,message:`No dentist with the id of ${req.params.dentistId}`});
        }


        req.body.user=req.user.id;

        const existedBookings = await Booking.find({user:req.user.id});

        if(existedBookings.length >= 1 && req.user.role !== 'admin'){
            return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 1 bookings`});
        }


        const booking = await Booking.create(req.body);

        res.status(200).json({
            success:true,
            data: booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot create Booking"});
    }
};


exports.updateBooking = async (req,res,next) =>{
    try {
        let abooking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({success:false,message:`No booking with the id of ${req.params.id}`});
        }


        if(booking.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this booking`})
        }

        booking = await Booking.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            success:true,
            data:booking
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({success:false,message:"Cannot update Booking"});
    }
};

exports.deleteBooking = async (req,res,next) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({success:false,message:`No booking with the id of ${req.params.id}`});
        }


        if(booking.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this booking`})
        }

        await booking.remove();

        res.status(200).json({
            success:true,
            data:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot delete Booking"});

    }
};