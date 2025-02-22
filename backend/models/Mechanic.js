const mongoose= require('mongoose')

const Mechanic=new mongoose.Schema(
  {
    name: {type:String , required:true},
    bussinessName: { type: String, required: true },
    phone : {type:String,required: true,unique:true},
    email : {type:String , required :true , unitque : true},
    password : { type:String , required:true},
    resetToken: {type :String},
    resetTokenExpiry: {type :Date},
  },
  {timestamps : true}

);

module.exports=mongoose.model('Mechanic',Mechanic);