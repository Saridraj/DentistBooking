const User = require('../models/User');

//@desc     Register user
//@route    POST /api/v1/register
//@access   Public
exports.register = async (req, res, next)=>{
    try{
        const {name, tel, email, password, role} = req.body;

        //Create user
        const user = await User.create({
            name,
            tel,
            email,
            password,
            role
        })

        //Create token
        sendTokenResponse(user, 200, res);
    }catch(err){
        res.status(400).json({success: false});
        console.log(err.stack);
    }
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res)=>{
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.success = true;
    }

    res.status(statusCode).cookie('token', token, options).json({success: true, token})
}