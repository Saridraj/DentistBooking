const Dentist = require("../models/Dentist");

exports.getDentists = async (req,res,next)=>{
    try{
        const dentists = await Dentist.find();
        res.status(200).json({success:true,count:dentists.length, data:dentists});
    } catch(err) {
        res.status(400).json({success:false});
    }
};
