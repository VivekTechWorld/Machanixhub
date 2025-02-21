const bcrypt = require('bcryptjs');
const Mechanic = require('../models/Mechanic');
const sendEmail = require('../utils/sendmail');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.forgetPassword = async (req, res) => {

    try
    {
        const {email}=req.body;
        const mechanic=await Mechanic.findOne({email});

        if(!mechanic)
        {
            return res.status(400).json({message:"Mechanic not found"});
        }

        const token =jwt.sign({id:mechanic._id},process.env.JWT_SECRET,{expiresIn:"10m"});
        console.log(token);
        mechanic.resetToken=token;
        mechanic.resetTokenExpiry=Date.now()+10*60*1000;
        await mechanic.save();

        const resetlink=`http://10.0.2.2:5000/api/mechanic/forgot-password?token=${token}&userType=mechanic`;
        await sendEmail(email,"Password reset link",`<p>Click <a href="${resetlink}">here</a> to reset your password</p>`);

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
        const mechanic=await Mechanic.findOne({resetToken:token, resetTokenExpiry:{$gt : Date.now()}});

        if(!mechanic)
        {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        mechanic.password=await bcrypt.hash(newPassword,10);
        mechanic.resetToken=null;
        mechanic.resetTokenExpiry=null;
        await mechanic.save();

        res.json({message: "Passwowrd reset successfull"});
    }
    catch(error)
    {
        res.status(500).json({message:"Server error",error:error.message});
    }   
};