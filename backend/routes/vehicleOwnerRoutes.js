const express = require('express');
const bcrypt = require('bcryptjs');
const VechicleOwner = require('../models/VechicleOwner');

const router = express.Router();

router.post('/register',async(req,res)=>
{
    try
    {
        const { name,phone,email,password,vehicleNumber } = req.body;

        const exitsVechicleOwner = await VechicleOwner.findOne({email});

        if(exitsVechicleOwner)
        {
            console.log("Mechanic already exists:", email); // Log duplicate email
            return res.status(400).json({message:"VechicleOwner already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newVehicleOwner = new VechicleOwner(
            {
                name,
                phone,
                email,
                password:hashedPassword,
                vehicleNumber,
            }
        );

        await newVehicleOwner.save();
        console.log("Mechanic registered successfully:", email); // Log success
        res.status(201).json({message:"VechicleOwner registered successfully"});


    }
    catch(error)
    {
        console.error("Registration error:", error); // Log errors
        res.status(500).json({message:"Something went wrong",error:error.message});
    }


});

module.exports=router;
