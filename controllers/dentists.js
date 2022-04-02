

exports.getDentists = async (req,res,next)=>{
    res.status(200).json({success:true,msg:'Show all dentists'})
};
