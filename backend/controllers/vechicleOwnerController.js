const bcrypt = require('bcryptjs');
const  VechicleOwner= require('../models/VechicleOwner');
const sendEmail = require('../utils/sendmail');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.forgetPassword = async (req, res) => {

    try
    {
        const {email}=req.body;

        const vehicleowner=await VechicleOwner.findOne({email});
        console.log(vehicleowner);
        if(!VechicleOwner)
        {
            return res.status(400).json({message:"Mechanic not found"});
        }

        const token =jwt.sign({id:vehicleowner._id},process.env.JWT_SECRET,{expiresIn:"10m"});
        console.log(token);
        vehicleowner.resetToken=token;
        vehicleowner.resetTokenExpiry=Date.now()+10*60*1000;
        await vehicleowner.save();

        const resetLink = `http://10.0.2.2:5000/api/vehicleOwner/redirect?token=${token}&userType=VechicleOwner`;
        await sendEmail(email,"Password reset link",`<p>Click <a href="${resetLink}">here</a> to reset your password</p>`);

        res.json({message :"Reset email sent"});
    }
    catch(error)
    {
        res.status(500).json({message:"Something went wrong in mechanic",error:error.message});
    }

};

exports.resetPassword = async (req, res) => {

    try
    {
        const {token,newPassword}=req.body;
        console.log(token);
        console.log(newPassword);
        const vehicleowner=await VechicleOwner.findOne({resetToken:token,resetTokenExpiry:{$gt : Date.now()}});
        console.log(vehicleowner);
        if(!vehicleowner)
        {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        vehicleowner.password=await bcrypt.hash(newPassword,10);
        vehicleowner.resetToken=null;
        vehicleowner.resetTokenExpiry=null;
        await vehicleowner.save();

        res.json({message: "Passwowrd reset successfull"});
    }
    catch(error)
    {
        res.status(500).json({message:"Server error",error:error.message});
    }   
};