const mongoose=require('mongoose')

const VechicleOwner=new mongoose.Schema(

    {
        name:{type : String ,required : true},
        phone:{ type :String ,required : true},
        email :{ type : String ,required : true,unique : true },
        password : { type : String,required : true,unique : true},
        // VechicleType : {type : String},
        // VehicleNumber : {type : String}, 

    },
    {timestamps : true}

);

module.exports=mongoose.model('VechicleOwner',VechicleOwner);