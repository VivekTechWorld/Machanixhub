const express = require('express');
const bcrypt = require('bcryptjs');
const Mechanic = require('../models/Mechanic');

const router = express.Router();

//mechanic registration 
router.post('/register',async(req,res)=>
{
    try
    {
        const {name,bussinessName,phone,email,password}=req.body;

        const exitsMechanic = await Mechanic.findOne({email});
    
        if(exitsMechanic)
        {
            console.log("Mechanic already exists:", email); // Log duplicate email
            return res.status(400).json({message:"Mechanic already exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newMechanic = new Mechanic({ 
            name,
            bussinessName,
            phone,
            email,
            password:hashedPassword,
        });
    
        await newMechanic.save();
        console.log("Mechanic registered successfully:", email); // Log success
        res.status(201).json({message:"Mechanic registered successfully"});
    }
    catch(err)
    {
        console.error("Registration error:", err); // Log errors
        res.status(500).json({message:"Something went wrong",error:err.message});
    }
});


module.exports= router;